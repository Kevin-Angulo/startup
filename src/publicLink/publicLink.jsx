import React from 'react';
import { NavLink } from 'react-router-dom';


export function PublicLink() {
  return (
    <main className="px-10 py-5">
      {/* <!-- Hero Title --> */}
      <h2 className="text-4xl font-bold text-center max-sm:text-2xl">[board.name]</h2>
      <NavLink
        to="/"
        className="flex justify-center text-sm font-bold text-center pb-10 btn btn-link text-neutral"
      >
        Powered by <span className="text-primary">DashLink</span>
      </NavLink>

      {/* <!--PLACEHOLDER : API POST CALL *CREATE NEW DASHLINK--> */}
      <div className="card bg-primary text-primary-content max-w-xl m-auto mb-10">
        <form className="card-body">
          <h2 className="card-title">New Feedback Post</h2>
          <input
            type="text"
            placeholder="Short Description..."
            className="input input-bordered w-full max-w-xs mb-4"
          />
          <input
            type="text"
            placeholder="Feedback..."
            className="input input-bordered w-full max-w-s"
          />
          {/* <!--PLACEHOLDER : API POST CALL *CREATE NEW FEEDBACK POST--> */}

          <div className="flex flex-col card-actions justify-start mt-5">
            <div className="flex items-center gap-3 mb-3">
              <p className="font-bold">I am a robot</p>
              <input type="checkbox" className="toggle" checked="unchecked" />
            </div>
            <button className="btn">Send Feedback</button>
          </div>
        </form>
      </div>

      {/* <!--PLACEHOLDER : DATABASE DYNAMIC DATA OF ALL FEEDBACK POSTS--> */}
      <h2 className="text-4xl font-bold text-center mb-5 max-sm:text-2xl">Past Feedback Posts</h2>
      {/* <!-- LIST OF POSTS --> */}
      <ul className="max-sm:text-sm">
        <li className="card bg-neutral text-neutral-content max-w-xl mx-auto mb-7">
          <div className="card-body items-left text-left">
            <div className="flex justify-between">
              <h2 className="card-title">[post 1 title]</h2>
              <div className="indicator">
                <span className="indicator-item badge badge-secondary">15</span>
                <button className="btn btn-sm">Up Vote ⬆️</button>
              </div>
            </div>
            <p>[post date]</p>
            <p>
              [Comment] Lorem ipsum odor amet, consectetuer adipiscing elit.
              Libero aliquam curabitur amet ipsum interdum! Libero facilisi
              tempor sodales vel elit. Quisque orci sagittis luctus blandit diam
              adipiscing.
            </p>
          </div>
        </li>

        <li className="card bg-neutral text-neutral-content max-w-xl mx-auto mb-7">
          <div className="card-body items-left text-left">
            <div className="flex justify-between">
              <h2 className="card-title">404 Error</h2>
              <div className="indicator">
                <span className="indicator-item badge badge-secondary">13</span>
                <button className="btn btn-sm">Up Vote ⬆️</button>
              </div>
            </div>
            <p>September 30th 2024</p>
            <p>
              Your website keeps returning a 404 error when I try to access the
              contact page. I Think there is some time of href error going on or
              the contact page is not properly set up.
            </p>
          </div>
        </li>

        <li className="card bg-neutral text-neutral-content max-w-xl mx-auto mb-7">
          <div className="card-body items-left text-left">
            <div className="flex justify-between">
              <h2 className="card-title">[post 3 title]</h2>
              <div className="indicator">
                <span className="indicator-item badge badge-secondary">9</span>
                <button className="btn btn-sm">Up Vote ⬆️</button>
              </div>
            </div>
            <p>[post date]</p>
            <p>
              [Comment] Lorem ipsum odor amet, consectetuer adipiscing elit.
              Libero aliquam curabitur amet ipsum interdum! Libero facilisi
              tempor sodales vel elit. Quisque orci sagittis luctus blandit diam
              adipiscing.
            </p>
          </div>
        </li>
      </ul>
    </main>
  );
}