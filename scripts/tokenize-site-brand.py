#!/usr/bin/env python3
"""Tokenize FAQs / review meta / footer labels in site.ts for brand expandability."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "src/data/site.ts"
text = path.read_text(encoding="utf-8")

HELPERS = """export {
	brand,
	blogLabel,
	fillBrandTokens,
	seoDescription,
	seoTitle,
	siteConfig,
	seoKeywords,
	productInfo,
} from './site-core';

import { fillBrandTokens } from './brand';

function faq<T extends { question: string; answer: string; seoTitle: string; seoDescription: string }>(item: T): T {
	return {
		...item,
		question: fillBrandTokens(item.question),
		answer: fillBrandTokens(item.answer),
		seoTitle: fillBrandTokens(item.seoTitle),
		seoDescription: fillBrandTokens(item.seoDescription),
	};
}

function reviewMeta<T extends { seoTitle: string; seoDescription: string }>(item: T): T {
	return {
		...item,
		seoTitle: fillBrandTokens(item.seoTitle),
		seoDescription: fillBrandTokens(item.seoDescription),
	};
}

"""

if "from './site-core'" not in text:
    raise SystemExit("unexpected site.ts header")

text = re.sub(
    r"export \{[\s\S]*?\} from './site-core';\s*\nimport \{ fillBrandTokens \} from './brand';\s*\n(?:function faq[\s\S]*?\n\n)?(?:function reviewMeta[\s\S]*?\n\n)?",
    HELPERS,
    text,
    count=1,
)


def wrap_objects(block: str, marker: str, wrapper: str) -> str:
    """Wrap top-level objects that contain `marker` (e.g. question: / handle:)."""
    out: list[str] = []
    i = 0
    needle = "{\n\t\t" + marker
    while i < len(block):
        idx = block.find(needle, i)
        if idx == -1:
            out.append(block[i:])
            break
        prefix = block[max(0, idx - len(wrapper) - 1) : idx]
        if prefix.endswith(wrapper + "("):
            out.append(block[i : idx + 1])
            i = idx + 1
            continue
        out.append(block[i:idx])
        depth = 0
        p = idx
        while p < len(block):
            ch = block[p]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    out.append(f"{wrapper}({block[idx : p + 1]})")
                    i = p + 1
                    break
            p += 1
        else:
            raise SystemExit(f"unclosed object near {marker}")
    return "".join(out)


def tokenize_faq_text(s: str) -> str:
    pairs = [
        ("support@warzonehacks.net", "{email}"),
        ("Warzone Hacks", "{brand}"),
        ("warzone hacks", "{primaryKeyword}"),
        ("Warzone hacks", "{primaryKeyword}"),
        ("warzone cheats", "{game} cheats"),
        ("warzone hack", "{game} hack"),
        ("warzone esp", "{game} esp"),
        ("warzone aimbot", "{game} aimbot"),
        ("Ricochet", "{antiCheat}"),
        ("Warzone", "{game}"),
    ]
    for a, b in pairs:
        s = s.replace(a, b)
    return s


def tokenize_nav_labels(s: str) -> str:
    pairs = [
        ("Warzone Hacks", "{brand}"),
        ("Warzone hack", "{game} hack"),
        ("Warzone Aimbot", "{game} Aimbot"),
        ("Warzone ESP", "{game} ESP"),
        ("Warzone wallhack", "{game} wallhack"),
        ("Warzone radar", "{game} radar"),
        ("Warzone cheats", "{game} cheats"),
        ("Warzone hacks", "{primaryKeyword}"),
        ("Warzone", "{game}"),
        ("Ricochet", "{antiCheat}"),
    ]
    for a, b in pairs:
        s = s.replace(a, b)

    def wrap_label(m: re.Match[str]) -> str:
        label = m.group(1)
        if "{" in label:
            return f"label: fillBrandTokens('{label}')"
        return m.group(0)

    return re.sub(r"label: '([^']*)'", wrap_label, s)


def tokenize_seo_fields(s: str) -> str:
    def sub_val(val: str) -> str:
        val = val.replace("Warzone Hacks", "{brand}")
        val = val.replace("Ricochet", "{antiCheat}")
        val = val.replace("Warzone", "{game}")
        val = val.replace("warzone", "{game}")
        return val

    def repl(m: re.Match[str]) -> str:
        return f"{m.group(1)}'{sub_val(m.group(2))}'"

    s = re.sub(r"(seoTitle:\s*)'([^']*)'", repl, s)
    s = re.sub(r"(seoDescription:\s*)'([^']*)'", repl, s)
    return s


trust_end = text.index("export const seoLandingPages")
faq_type = text.index("export type FaqItem")
home_faqs = text.index("export const homeFaqs")
customer = text.index("export const customerReviews")
stats = text.index("export const customerReviewStats")

nav = tokenize_nav_labels(text[trust_end:faq_type])
pre = text[:trust_end]
faq_types = text[faq_type:home_faqs]
faqs = wrap_objects(tokenize_faq_text(text[home_faqs:customer]), "question:", "faq")
reviews = wrap_objects(tokenize_seo_fields(text[customer:stats]), "handle:", "reviewMeta")
tail = text[stats:]

path.write_text(pre + nav + faq_types + faqs + reviews + tail, encoding="utf-8")
print("updated", path)
