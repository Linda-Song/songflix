import React from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import YouTube from "react-youtube";
import { useMovieVideosQuery } from "../../hooks/useMovieVideos";

const MovieVideos = ({ movieId, show, handleClose }) => {
  const { data, isError, error } = useMovieVideosQuery(movieId);

  const videoList = data?.data.results;
  const video = videoList?.find((v) => v.type === "Trailer") || videoList?.[0];

  // const [showVideo, setShowVideo] = useState(false);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  if (!video) {
    return null;
  }

  return (
    <div className="mb-3">
      {/* <Button
        variant="danger"
        onClick={handleOpen}
        className="fw-bold d-flex align-items-center gap-2 video-btn"
      >
        <span>Watch Trailer ▶</span>
      </Button> */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        contentClassName="bg-dark text-white"
      >
        <Modal.Body className="p-0">
          <YouTube videoId={video.key} opts={opts} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MovieVideos;
