import { useTranslation } from "react-i18next";
import { SocialIconLink } from "@/components/SocialIconLink";
import { TerminalLabel } from "@/components/TerminalLabel";
import { profile } from "@/config/profile";

export function SiteFooter() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	return (
		<footer className="flex flex-col items-center justify-between gap-4 sm:flex-row">
			<TerminalLabel variant="slashes" className="text-muted-foreground">
				{t("footer.rights", { year })}
			</TerminalLabel>
			<div className="flex items-center gap-1">
				{profile.socials.map((social) => (
					<SocialIconLink key={social.key} social={social} />
				))}
			</div>
		</footer>
	);
}
