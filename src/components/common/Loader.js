import Skeleton from "@mui/material/Skeleton";
import "./Loader.scss";

const Loader = () => (
  <div className="loader" aria-label="Loading data placeholder">
    <Skeleton variant="text" height={50} />
    <div className="skeleton-wrapper">
      {Array.from(new Array(3)).map((x, i) => (
        <div className="skeleton-item" key={i}>
          <Skeleton variant="rectangle" width={210} height={210} />
          <Skeleton variant="text" width={210} height={40} />
        </div>
      ))}
    </div>
  </div>
);

export default Loader;
