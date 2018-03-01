import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import shuffle from 'shuffle-seed';
import Random from 'random-seed';
import s from './Home.css';

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

const seed = Random.create('home');

class HomeHero extends Component {
  render() {
    const { history } = this.props;
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
                  const zIndex = seed.intBetween(349, 351);
                  return (
                    <div
                      className={s.skills}
                      key={i}
                      style={{
                        zIndex,
                      }}
                    >
                      {shuffle.shuffle(skills, i).map((skill, idx) => {
                        const animationDelay = seed.intBetween(0, 500);
                        const animationDuration = seed.intBetween(15, 60);
                        const top = seed.intBetween(-50, 200);
                        const left = seed.intBetween(-50, 200);
                        const fontSize = seed.intBetween(3, 9);

                        return (
                          <span
                            className={s.skill}
                            key={`${skill}_${idx}`}
                            style={{
                              position: 'relative',
                              animationDelay: `${animationDelay}ms`,
                              animationDuration: `${animationDuration}s`,
                              top: `${top}px`,
                              left: `${left}px`,
                              fontSize: `${fontSize}em`,
                            }}
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
