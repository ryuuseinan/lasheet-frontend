import React from 'react';

const Home = ({ beatmapsWithDifficulties }) => {
  return (
    <div className="row">
      {beatmapsWithDifficulties.map((item) => (
        <div key={item.beatmap.id} className="col-md-3">
          <div style={{ margin: '10px' }} className="card">
            <div
              className="card-body"
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '20px',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Background */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(/static/extracted/${item.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(1px) saturate(150%)',
                  zIndex: -1,
                }}
              ></div>
              {/* Card Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p
                  className="artist-title-beatmap"
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <a href={`/beatmap/${item.beatmap.id}`}>{item.artist} - {item.title}</a>
                </p>
                <p className="artist-title-beatmap">
                  Mapped by <a href={`https://osu.ppy.sh/users/${item.creator}`}>{item.creator}</a>
                </p>
                <span className="diff-container">
                  {item.difficulties.map((diff, index) => (
                    <img
                      key={index}
                      src={getDifficultyIcon(diff.star_rating)}
                      alt={diff.version}
                      title={`${diff.version} - ${diff.star_rating}★`}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const getDifficultyIcon = (stars) => {
  if (stars <= 1.99) return 'URL_EASY';
  if (stars <= 2.69) return 'URL_NORMAL';
  if (stars <= 3.99) return 'URL_HARD';
  if (stars <= 5.29) return 'URL_INSANE';
  if (stars <= 6.49) return 'URL_EXPERT';
  return 'URL_EXPERT_PLUS';
};

export default Home;
