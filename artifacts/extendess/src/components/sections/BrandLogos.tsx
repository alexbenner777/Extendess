import crescinaImg from "../../assets/brands/crescina.png";
import lorealImg from "../../assets/brands/loreal.png";
import phytomerImg from "../../assets/brands/phytomer.png";
import noadadaImg from "../../assets/brands/noadada.png";
import sisleyImg from "../../assets/brands/sisley.png";
import enhelImg from "../../assets/brands/enhel.png";
import nescensImg from "../../assets/brands/nescens.png";

interface BrandLogoProps {
  className?: string;
}

function BrandImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ objectFit: "contain", filter: "grayscale(1) contrast(1.1)" }}
    />
  );
}

export function CrescinaLogo({ className }: BrandLogoProps) {
  return <BrandImg src={crescinaImg} alt="Crescina" className={className} />;
}

export function LorealLogo({ className }: BrandLogoProps) {
  return <BrandImg src={lorealImg} alt="L'Oréal" className={className} />;
}

export function PhytomerLogo({ className }: BrandLogoProps) {
  return <BrandImg src={phytomerImg} alt="Phytomer" className={className} />;
}

export function NoadadaLogo({ className }: BrandLogoProps) {
  return <BrandImg src={noadadaImg} alt="Noadada Cosmeric Series" className={className} />;
}

export function SisleyLogo({ className }: BrandLogoProps) {
  return <BrandImg src={sisleyImg} alt="Sisley Paris" className={className} />;
}

export function EnhelLogo({ className }: BrandLogoProps) {
  return <BrandImg src={enhelImg} alt="Enhel Group Company" className={className} />;
}

export function NescensLogo({ className }: BrandLogoProps) {
  return <BrandImg src={nescensImg} alt="Nescens" className={className} />;
}

export function KerastaseLogo({ className }: BrandLogoProps) {
  return (
    <svg className={className} viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="35" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fontWeight="400" letterSpacing="4" fill="currentColor">KÉRASTASE</text>
      <line x1="40" y1="44" x2="140" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
      <text x="50%" y="54" textAnchor="middle" fontFamily="Georgia, serif" fontSize="6" fontWeight="300" letterSpacing="5" fill="currentColor" opacity="0.6">PARIS</text>
    </svg>
  );
}

export function WellaLogo({ className }: BrandLogoProps) {
  return (
    <svg className={className} viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="32" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="700" letterSpacing="2" fill="currentColor">WELLA</text>
      <text x="50%" y="50" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7.5" fontWeight="300" letterSpacing="3.5" fill="currentColor" opacity="0.6">PROFESSIONALS</text>
    </svg>
  );
}

export function SchwarzLogo({ className }: BrandLogoProps) {
  return (
    <svg className={className} viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="30" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="currentColor">SCHWARZKOPF</text>
      <text x="50%" y="48" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7.5" fontWeight="300" letterSpacing="3" fill="currentColor" opacity="0.6">PROFESSIONAL</text>
    </svg>
  );
}

export function RedkenLogo({ className }: BrandLogoProps) {
  return (
    <svg className={className} viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="22" width="130" height="18" fill="currentColor" rx="0"/>
      <text x="50%" y="35.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="900" letterSpacing="5" fill="white">REDKEN</text>
    </svg>
  );
}

export function DavinesLogo({ className }: BrandLogoProps) {
  return (
    <svg className={className} viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="36" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="400" letterSpacing="6" fill="currentColor">davines</text>
    </svg>
  );
}

export function OlaplexLogo({ className }: BrandLogoProps) {
  return (
    <svg className={className} viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="17" r="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <text x="50%" y="44" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" letterSpacing="4" fill="currentColor">OLAPLEX</text>
    </svg>
  );
}

export function LaBiosthetiqueLogo({ className }: BrandLogoProps) {
  return (
    <svg className={className} viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="26" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9.5" fontWeight="400" letterSpacing="3.5" fill="currentColor">LA BIOSTHÉTIQUE</text>
      <line x1="50" y1="33" x2="130" y2="33" stroke="currentColor" strokeWidth="0.5" opacity="0.35"/>
      <text x="50%" y="47" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7" fontWeight="300" letterSpacing="3" fill="currentColor" opacity="0.55">PARIS</text>
    </svg>
  );
}
