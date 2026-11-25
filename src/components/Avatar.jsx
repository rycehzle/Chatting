export default function Avatar({ name, size = 32 }) {
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.42 }}>
      {name?.[0]?.toUpperCase()}
    </span>
  );
}
