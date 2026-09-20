import {
  siClaudecode,
  siCursor,
  siDocker,
  siGooglegemini,
  siMake,
  siVercel,
  siZapier,
} from "simple-icons";
import { skillItems, type SkillItem, type SkillLogo } from "@/content/portfolio";

type SkillIcon = {
  path: string;
  viewBox: string;
};

const icons: Record<SkillLogo, SkillIcon> = {
  claudecode: { path: siClaudecode.path, viewBox: "0 0 24 24" },
  openai: {
    path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
    viewBox: "0 0 24 24",
  },
  cursor: { path: siCursor.path, viewBox: "0 0 24 24" },
  vscode: {
    path: "M70.9119 99.5723C72.4869 100.189 74.2828 100.15 75.8725 99.3807L96.4604 89.4231C98.624 88.3771 100 86.1762 100 83.7616V16.2392C100 13.8247 98.624 11.6238 96.4604 10.5774L75.8725.619067C73.7862-.389991 71.3446-.142885 69.5135 1.19527C69.252 1.38636 69.0028 1.59985 68.769 1.83502L29.3551 37.9795 12.1872 24.88C10.5891 23.6607 8.35365 23.7606 6.86938 25.1178L1.36302 30.1525C-.452603 31.8127-.454583 34.6837 1.35854 36.3466L16.2471 50.0001 1.35854 63.6536C-.454583 65.3164-.452603 68.1876 1.36302 69.8477L6.86938 74.8824C8.35365 76.2395 10.5891 76.34 12.1872 75.1201L29.3551 62.0207 68.769 98.1651C69.3925 98.7923 70.1246 99.2645 70.9119 99.5723ZM75.0152 27.1813 45.1092 50.0001 75.0152 72.8189V27.1813Z",
    viewBox: "0 0 100 100",
  },
  zapier: { path: siZapier.path, viewBox: "0 0 24 24" },
  make: { path: siMake.path, viewBox: "0 0 24 24" },
  activepieces: {
    path: "M6.46013 5.81759C5.30809 4.10962 5.75876 1.79113 7.46672.639093 9.17469-.512944 11.4932-.0622757 12.6452 1.64569L20.4261 13.1813C21.5781 14.8893 21.1274 17.2077 19.4195 18.3598 17.7115 19.5118 15.393 19.0611 14.241 17.3532L10.8676 12.3519C10.4339 11.8054 9.55114 11.8905 9.02108 12.4205 8.58152 12.8601 8.43761 13.9846 8.31301 14.9582 8.29474 15.1009 8.27689 15.2405 8.25858 15.3741 8.19097 16.0114 7.97092 16.6418 7.58762 17.2101 6.33511 19.067 3.81375 19.5565 1.95682 18.304.0998936 17.0515-.390738 14.5304.861776 12.6734 1.51136 11.7104 2.50224 11.1151 3.56472 10.9399L3.56322 10.9384C6.63307 10.4932 7.20222 7.02864 6.64041 6.08487L6.46013 5.81759Z",
    viewBox: "0 0 22 19",
  },
  vercel: { path: siVercel.path, viewBox: "0 0 24 24" },
  docker: { path: siDocker.path, viewBox: "0 0 24 24" },
  googlegemini: { path: siGooglegemini.path, viewBox: "0 0 24 24" },
};

const duplicateSets = [1, 2, 3, 4];

function SkillMark({ item }: { item: SkillItem }) {
  const icon = icons[item.logo];

  return (
    <li aria-label={item.name} className="skill-mark">
      <svg aria-hidden="true" className="skill-logo" viewBox={icon.viewBox}>
        <path d={icon.path} />
      </svg>
    </li>
  );
}

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="skills-section" id="skills">
      <div className="skills-heading">
        <h2 data-reveal="fade" id="skills-heading">
          Daily drivers. <span>Built for the work.</span>
        </h2>
        <p data-reveal data-reveal-delay="70">
          AI-native tools for building and automating useful systems.
        </p>
      </div>

      <div aria-label="Daily tools" className="skill-lanes" data-reveal="fade">
        <div className="skill-lane">
          <div className="skill-lane__viewport">
            <div className="skill-track">
              <ul className="skill-set">
                {skillItems.map((item) => <SkillMark item={item} key={item.name} />)}
              </ul>
              {duplicateSets.map((set) => (
                <ul aria-hidden="true" className="skill-set" key={`duplicate-set-${set}`}>
                  {skillItems.map((item) => <SkillMark item={item} key={`${set}-${item.name}`} />)}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
