export default function Score({ score, highScore }) {
  return (
    <h2 className="current-score">
      Current Score: {score}
      <span style={{ margin: "0 20px" }}></span>High Score: {highScore}
    </h2>
  );
}
