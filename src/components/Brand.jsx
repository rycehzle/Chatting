import cfg from '../config/appConfig.js';
import s from './Brand.module.css';

export default function Brand({ part, size }) {
  const { appName, logo, brandDisplay } = cfg;
  const px = size || logo.size;
  const showLogo = part ? part === 'logo' : brandDisplay !== 'name';
  const showName = part ? part === 'name' : brandDisplay !== 'logo';
  let mark = null;
  if (logo.type === 'image' && logo.image) mark = <img className={s.img} src={logo.image} alt="" style={{ width: px, height: px, borderRadius: logo.radius }} />;
  else if (logo.type === 'text') mark = <span className={s.logo} style={{ width: px, height: px, borderRadius: logo.radius, fontSize: px * 0.55 }}>{logo.text}</span>;
  else if (logo.type === 'emoji') mark = <span className={s.emoji} style={{ fontSize: px }}>{logo.text}</span>;
  return <span className={s.wrap}>{showLogo && mark}{showName && <span>{appName}</span>}</span>;
}
