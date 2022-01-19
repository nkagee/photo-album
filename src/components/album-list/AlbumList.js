import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as albumListActions from "../../redux/actions/albumListActions";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import "./AlbumList.scss";
import Loader from "../common/Loader";
import { motion } from "framer-motion";

export function AlbumList({ albumList, loading, actions, ...props }) {
  useEffect(() => {
    if (albumList.length === 0) {
      actions.loadAlbumList().catch((e) => console.error(e));
    }
  }, [albumList, actions]);

  return (
    <div className="album-list-page">
      {loading ? (
        <Loader />
      ) : (
        <div className="album-gallery">
          <div className="page-title">Photo Albums</div>
          <div className="grid">
            {albumList.map((album) => (
              <Link
                key={album.id}
                to={`/album/${album.id}`}
                className="grid-item link-to-album"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {album.title}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    albumList: state.albumList,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(albumListActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
