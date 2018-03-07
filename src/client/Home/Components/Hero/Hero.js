import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import shuffle from 'shuffle-seed';
import Random from 'random-seed';
import s from './Hero.css';

const skills = [
  'angular',
  'aws',
  'git',
  'github',
  'docker',
  'app-store',
  'android',
  'ember',
  'edge',
  'firefox',
  'chrome',
  'erlang',
  'html5',
  'css3-alt',
  'grunt',
  'gulp',
  'laravel',
  'magento',
  'js',
  'jenkins',
  'less',
  'sass',
  'npm',
  'php',
  'python',
  'safari',
  'wordpress',
  'microsoft',
  'apple',
  'phoenix-framework',
  'vuejs',
];

class HomeHero extends Component {
  render() {
    const { history } = this.props;

    return (
      <div className={s.hero2}>
        <div className={s.tileView}>
          <div className={s.heroContainer}>
            <div className={s.heroBg}>
              <div className={s.heroGrid}>
                <div className={s.heroGridItem}>
                  <img
                    src="https://humblebundle.imgix.net/misc/files/hashed/7fa727916654e10d77f03c989312efd5ddb106af.png?bg=000000&fit=crop&auto=compress&w=150&h=218&fm=jpg&s=312d402454cf07c715e9b70cd177ba05"
                    alt=""
                  />
                </div>
                <div className={s.heroGridItem}>
                  <img
                    src="https://humblebundle.imgix.net/misc/files/hashed/7fa727916654e10d77f03c989312efd5ddb106af.png?bg=000000&fit=crop&auto=compress&w=150&h=218&fm=jpg&s=312d402454cf07c715e9b70cd177ba05"
                    alt=""
                  />
                </div>
                <div className={s.heroGridItem}>
                  <img
                    src="https://humblebundle.imgix.net/misc/files/hashed/7fa727916654e10d77f03c989312efd5ddb106af.png?bg=000000&fit=crop&auto=compress&w=150&h=218&fm=jpg&s=312d402454cf07c715e9b70cd177ba05"
                    alt=""
                  />
                </div>
                <div className={s.heroGridItem}>
                  <img
                    src="https://humblebundle.imgix.net/misc/files/hashed/7fa727916654e10d77f03c989312efd5ddb106af.png?bg=000000&fit=crop&auto=compress&w=150&h=218&fm=jpg&s=312d402454cf07c715e9b70cd177ba05"
                    alt=""
                  />
                </div>
                <div className={s.heroGridItem}>
                  <img
                    src="https://humblebundle.imgix.net/misc/files/hashed/7fa727916654e10d77f03c989312efd5ddb106af.png?bg=000000&fit=crop&auto=compress&w=150&h=218&fm=jpg&s=312d402454cf07c715e9b70cd177ba05"
                    alt=""
                  />
                </div>
                <div className={s.heroGridItem}>
                  <img
                    src="https://humblebundle.imgix.net/misc/files/hashed/7fa727916654e10d77f03c989312efd5ddb106af.png?bg=000000&fit=crop&auto=compress&w=150&h=218&fm=jpg&s=312d402454cf07c715e9b70cd177ba05"
                    alt=""
                  />
                </div>
                <div className={s.heroGridItem}>
                  <img
                    src="https://humblebundle.imgix.net/misc/files/hashed/7fa727916654e10d77f03c989312efd5ddb106af.png?bg=000000&fit=crop&auto=compress&w=150&h=218&fm=jpg&s=312d402454cf07c715e9b70cd177ba05"
                    alt=""
                  />
                </div>
                <div className={s.heroGridItem}>
                  <img
                    src="https://humblebundle.imgix.net/misc/files/hashed/7fa727916654e10d77f03c989312efd5ddb106af.png?bg=000000&fit=crop&auto=compress&w=150&h=218&fm=jpg&s=312d402454cf07c715e9b70cd177ba05"
                    alt=""
                  />
                </div>
                <div className={s.heroGridItem}>
                  <img
                    src="https://humblebundle.imgix.net/misc/files/hashed/7fa727916654e10d77f03c989312efd5ddb106af.png?bg=000000&fit=crop&auto=compress&w=150&h=218&fm=jpg&s=312d402454cf07c715e9b70cd177ba05"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div className={`section medium ${s.root}`} style={{ display: 'block' }}>
        <div className={s.hero}>
          <div className={s.content}>
            <h1>
              Find your next developer job,<br /> in Nashville.
            </h1>

            <input
              type="text"
              placeholder="Search"
              className={`${s.input} ${s.search}`}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  history.push(`/search/${e.target.value}`);
                }
              }}
            />

            <div className={s.skillsContainer}>
              {Array(10)
                .fill(null)
                .map((skillRow, i) => {
                  const zIndexSeed = Random.create(`zindex_${i}`);
                  const zIndex = zIndexSeed.intBetween(349, 351);
                  return (
                    <div
                      className={s.skills}
                      key={i}
                      style={{
                        zIndex,
                      }}
                    >
                      {shuffle.shuffle(skills, i).map((skill, idx) => {
                        const animationDelaySeed = Random.create(
                          `animationDelay_${idx}_${i}`,
                        );
                        const animationDurationSeed = Random.create(
                          `animationDuration_${idx}_${i}`,
                        );
                        const topSeed = Random.create(`top_${idx}_${i}`);
                        const leftSeed = Random.create(`left_${idx}_${i}`);
                        const fontSizeSeed = Random.create(
                          `fontSize${idx}_${i}`,
                        );

                        const animationDelay = animationDelaySeed.intBetween(
                          0,
                          500,
                        );
                        const animationDuration = animationDurationSeed.intBetween(
                          15,
                          60,
                        );
                        const top = topSeed.intBetween(-50, 200);
                        const left = leftSeed.intBetween(-200, 200);
                        const fontSize = fontSizeSeed.intBetween(3, 9);

                        return (
                          <span
                            className={s.skill}
                            key={`${skill}_${idx}_${i}`}
                          >
                            <i className={`fa fab fa-${skill}`} />
                          </span>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(HomeHero);
