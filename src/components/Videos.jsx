import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Video from "./Video";
import useVideoList from "../hooks/useVideoList";
import { Link } from "react-router-dom";

const Videos = () => {
	const [page, setPage] = useState(1);
	const { loading, error, videos, hasMore } = useVideoList(page);
	return (
		<div>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<p className="error">There was an error!</p>
			) : videos.length > 0 ? (
				<InfiniteScroll
					dataLength={videos.length}
					hasMore={hasMore}
					loader={<div style={{ margin: "0 auto", width: "100px" }}>Loading...</div>}
					next={() => setPage(page + 8)}>
					{videos.map((video) =>
						video.noq > 0 ? (
							<Link to={`/quiz/${video.youtubeID}`} state={{videoTitle: video.title}} key={video.youtubeID}>
								<Video title={video.title} id={video.youtubeID} noq={video.noq} />
							</Link>
						) : (
							<Video
								key={video.youtubeID}
								title={video.title}
								id={video.youtubeID}
								noq={video.noq}
							/>
						),
					)}
				</InfiniteScroll>
			) : (
				<div>No data found!</div>
			)}
		</div>
	);
};

export default Videos;
