export default function Card({ name, img, onClick }) {
  return (
    <div onClick={onClick}>
      <img src={img} alt={`Image of ${name}`} />
      <h3>{name}</h3>
    </div>
  );
}
