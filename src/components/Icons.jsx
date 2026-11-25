const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
const I = (d) => (props) => <svg {...base} {...props}>{d}</svg>;

export const PlusIcon = I(<path d="M12 5v14M5 12h14" />);
export const SendIcon = I(<path d="M12 19V5M5 12l7-7 7 7" />);
export const MenuIcon = I(<path d="M4 7h16M4 12h16M4 17h16" />);
export const SunIcon = I(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>);
export const MoonIcon = I(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />);
export const MoreIcon = I(<><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>);
export const LogoutIcon = I(<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />);
export const CheckIcon = I(<path d="M5 12l5 5 9-10" />);
export const CheckAllIcon = I(<path d="M1 12l5 5 9-10M12 15l2 2 9-10" />);
export const ClockIcon = I(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const ChevronIcon = I(<path d="M6 9l6 6 6-6" />);
export const SearchIcon = I(<><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>);
export const PanelIcon = I(<><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M9 4v16" /></>);
export const NewChatIcon = I(<><path d="M12 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-5" /><path d="M18.4 3.6a1.8 1.8 0 0 1 2.5 2.5L12 15l-3.5 1 1-3.5z" /></>);
export const ArrowDownIcon = I(<path d="M12 5v14M5 12l7 7 7-7" />);
