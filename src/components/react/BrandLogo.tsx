type Props = {
	/** Accessible label when the logo is decorative inside a named link */
	alt?: string;
	className?: string;
};

/** Call of Duty wordmark — crisp PNG nav asset (transparent, white ink). */
export default function BrandLogo({ alt = 'Warzone Cheats logo', className }: Props) {
	return (
		<img
			className={className}
			src="/images/warzone-cheats-logo-nav.png"
			srcSet="/images/warzone-cheats-logo-nav-360w.png 360w, /images/warzone-cheats-logo-nav-480w.png 480w, /images/warzone-cheats-logo-nav-560w.png 560w, /images/warzone-cheats-logo-nav.png 640w, /images/warzone-cheats-logo-nav-720w.png 720w"
			sizes="(max-width: 480px) 160px, 200px"
			width={200}
			height={37}
			alt={alt}
			decoding="async"
			fetchPriority="high"
		/>
	);
}
