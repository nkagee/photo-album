import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as albumActions from "../../redux/actions/albumActions";
import { loadSingleAlbum } from "../../redux/actions/albumListActions";
import { bindActionCreators } from "redux";
import { useParams } from "react-router";
import "./Album.scss";
import Loader from "../common/Loader";
import { motion } from "framer-motion";

import CloseIcon from "@mui/icons-material/Close";

export function Album({ albumList, contents, loading, actions, ...props }) {
  const [showModal, setShowModal] = React.useState(false);
  const [activeImg, setActiveImg] = React.useState(null);
  const [albumContents, setAlbumContents] = React.useState([]);
  const [albumTitle, setAlbumTitle] = React.useState("");

  let { id } = useParams();

  useEffect(() => {
    const existingAlbum = albumList.find((album) => album.id === parseInt(id));

    if (!existingAlbum) {
      actions.loadAlbumInfo(id).catch((e) => console.error(e));
    } else {
      setAlbumTitle(existingAlbum.title);
    }
  }, [albumList, id, actions]);

  useEffect(() => {
    if (!contents[id]) {
      actions.albumActions.loadAlbumContents(id).catch((e) => console.error(e));
    } else {
      setAlbumContents(contents[id].slice(0, 15));
    }
  }, [actions, id, contents]);

  const handleThumbnailClick = (thumbnail) => {
    setShowModal(true);
    setActiveImg(thumbnail);
  };

  const resetModal = () => {
    setShowModal(false);
    setActiveImg(null);
  };

  const handleModalClick = (e) => {
    if (e.target.className === "gallery-modal") {
      resetModal();
    }
  };

  return (
    <div className="gallery-wrapper">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="page-title">{albumTitle}</div>
          <div className="grid gallery-grid">
            {albumContents?.map((thumbnail) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ opacity: 0.5 }}
                key={thumbnail.id}
                className="grid-item thumbnail-wrapper"
                onClick={() => handleThumbnailClick(thumbnail)}
              >
                <img src={thumbnail.thumbnailUrl} alt={thumbnail.title} />
                <div className="thumbnail-title">{thumbnail.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {showModal && activeImg && (
        <div className="gallery-modal" role="dialog" onClick={handleModalClick}>
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            className="modal-photo-wrapper"
          >
            <div className="exit-modal-btn" role="button" onClick={resetModal}>
              <CloseIcon fontSize={"large"} />
            </div>
            <div
              aria-label={`focused-image-title-${activeImg.title}`}
              className="photo-title"
            >
              {activeImg.title}
            </div>
            <img
              className="photo"
              aria-label={`focused-photo-${activeImg.title}`}
              src={activeImg.url}
              alt={activeImg.title}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    albumList: state.albumList,
    contents: state.albumContents,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      albumActions: bindActionCreators(albumActions, dispatch),
      loadAlbumInfo: bindActionCreators(loadSingleAlbum, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
