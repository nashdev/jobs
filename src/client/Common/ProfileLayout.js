import React from "react";
import moment from "moment";

import s from "./ProfileLayout.css";
import Transclude from "./Transclude";

const ProfileLayout = ({
  children,
  name,
  createdAt,
  shortDescription,
  createdAtLabel = "Posted",
}) => (
  <Transclude positions={children}>
    {({ positions }) => (
      <React.Fragment>
        {positions.hero && positions.hero}

        <section className="section">
          <div className="container">
            <div className="columns is-variable is-8">
              <div className="column is-4">
                {positions.sidebar && positions.sidebar}
                {positions.actions && (
                  <div className={s.card}>{positions.actions}</div>
                )}
              </div>

              <div className="column is-8">
                <div className={s.content}>
                  <div className="level">
                    <div className="level-left">
                      <h1 className={s.title}>{name}</h1>
                    </div>
                    <div className="level-right">
                      <small className={s.time}>
                        {createdAtLabel} {moment(createdAt).fromNow()}
                      </small>
                    </div>
                  </div>
                  <p className={s.shortDescription}>{shortDescription}</p>
                  {positions.content && positions.content}
                </div>
                {positions.related && (
                  <div className={s.related}>{positions.related}</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )}
  </Transclude>
);

ProfileLayout.Position = Transclude.Slot;

export default ProfileLayout;
