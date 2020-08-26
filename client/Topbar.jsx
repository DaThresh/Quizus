// React
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

// Socket
import setupSocket from './socket/api';

function Topbar(props){
    const [examName, setExamName] = useState('');

    useEffect(() => {
      setupSocket();
    }, []);

    var nameInterval = setInterval(() => {
        let name = global.exam.name;
        if(name !== ''){
            clearInterval(nameInterval);
            setExamName(name);
        }
    }, 100);

    function burger(event){
        let menu = document.querySelector('#' + event.currentTarget.dataset.target);
        menu.classList.toggle('is-active');
    }

    function fetchProgress(){
        if(!global.exam.createdAt) return -1;
        let createdAt = new Date(global.exam.createdAt).getTime();
        let now = new Date().getTime();
        let timeDiff = now - createdAt;
        return Math.round(100 - (timeDiff / global.exam.duration * 100));
    }

    function copy(){
        navigator.clipboard.writeText(window.location.href);
    }

    const [progress, setProgress] = useState(fetchProgress());
    setTimeout(() => setProgress(fetchProgress()), 1000);
    let progressClass = 'progress';
    if(progress > 66) progressClass += ' is-success';
    else if(progress > 25) progressClass += ' is-warning';
    else progressClass += ' is-danger';
    if(progress < 10) progressClass += ' blink-me';

    setInterval(() => {
        setProgress(fetchProgress());
    }, 60000);

    return (
        <span>
            <nav className="navbar is-light" role="navigation" aria-label="main navigation" id="topbar">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        {Icon()}
                    </a>
                    <a role="button" className="navbar-burger" data-target="mobile-menu" aria-label="menu" aria-expanded="false" onClick={burger}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <span className="title">{ examName }</span>
                        </div>
                    </div>
                </div>
            </nav>
            <div id="mobile-menu" className="has-background-white-bis">
                <p className="title" style={{marginBottom: '5px'}}>
                    { examName }
                </p>
                <div className="columns is-mobile">
                    <div className="column is-4">
                        <button className="button is-link is-light has-text-right" style={{verticalAlign: 'middle', marginRight: '15px'}} onClick={copy}>Copy Link</button>
                    </div>
                    <div className="column is-7">
                        <span className="progress-holder-mobile">
                            <span className="progress-text-mobile">Time left</span>
                            <progress id="room-progress-mobile"
                                    className={progressClass}
                                    style={{marginBottom: '0', display: 'inline-block'}}
                                    value={progress}
                                    max="100">
                            </progress>
                        </span>
                    </div>
                </div>
            </div>
        </span>
    )
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 626 188"
      style={{height: "35px"}}
    >
      <g fillRule="nonzero">
        <path
          fill="#4D4D4D"
          d="M253.693 89.443c0-7.018.812-13.158 2.438-18.463 1.647-5.284 3.744-9.499 6.312-12.645 2.568-3.145 5.669-5.711 9.306-7.701 3.637-1.969 7.21-3.294 10.719-3.958 3.529-.663 7.273-1.005 11.296-1.005 4 0 7.723.342 11.21 1.005 3.466.664 7.018 1.989 10.654 3.958 3.616 1.99 6.739 4.556 9.349 7.701 2.632 3.146 4.749 7.381 6.376 12.665 1.625 5.307 2.439 11.447 2.439 18.463 0 6.312-.663 11.938-2.011 16.838-1.327 4.878-3.082 8.921-5.264 12.087a30.27 30.27 0 01-7.894 7.938c-3.08 2.117-6.183 3.657-9.306 4.642-3.102.984-6.46 1.647-10.055 1.969 0 3.915 1.433 6.76 4.321 8.536 2.889 1.775 6.333 2.652 10.313 2.652v12.066c-18.228 0-27.342-7.787-27.342-23.383-4.428-.578-8.472-1.669-12.109-3.295-3.637-1.625-7.082-4.044-10.333-7.231-3.274-3.187-5.819-7.574-7.659-13.178-1.84-5.626-2.76-12.173-2.76-19.661zm17.308-15.853c-1.263 4.15-1.904 9.455-1.904 15.873 0 6.398.641 11.703 1.904 15.854 1.283 4.171 3.187 7.273 5.712 9.284 2.546 2.033 5.092 3.36 7.659 4.023 2.566.684 5.69 1.006 9.37 1.006 3.594 0 6.718-.322 9.328-1.006 2.61-.663 5.178-1.99 7.701-4.023 2.526-2.011 4.43-5.113 5.713-9.284 1.262-4.151 1.904-9.456 1.904-15.854 0-6.418-.642-11.723-1.904-15.873-1.283-4.172-3.187-7.253-5.713-9.286-2.523-2.01-5.091-3.358-7.701-4.021-2.61-.664-5.734-1.006-9.328-1.006-3.68 0-6.804.342-9.37 1.006-2.567.663-5.113 2.011-7.659 4.021-2.525 2.033-4.429 5.114-5.712 9.286zm74.078 29.715V68.262h15.403v37.033c0 5.114 1.049 8.815 3.146 11.061 2.096 2.246 5.52 3.381 10.269 3.381 4.834 0 8.3-1.135 10.398-3.381 2.095-2.246 3.144-5.947 3.144-11.061V68.262h15.403v35.043c0 9.414-2.546 16.773-7.637 22.08-5.092 5.304-12.195 7.958-21.308 7.958-9.114 0-16.196-2.654-21.245-7.958-5.049-5.307-7.573-12.666-7.573-22.08zm74.57-43.772V45.414h15.788v14.119h-15.788zm.257 72.783V68.262h15.403v64.054h-15.403zm27.931 0v-14.249l29.501-35.941h-28.882V68.262h48.694v14.121l-29.952 36.069h29.952v13.864h-49.313zm63.295-29.011V68.262h15.403v37.033c0 5.114 1.049 8.815 3.146 11.061 2.095 2.246 5.519 3.381 10.269 3.381 4.834 0 8.3-1.135 10.397-3.381 2.096-2.246 3.145-5.947 3.145-11.061V68.262h15.403v35.043c0 9.414-2.546 16.773-7.637 22.08-5.092 5.304-12.195 7.958-21.308 7.958-9.115 0-16.196-2.654-21.245-7.958-5.049-5.307-7.573-12.666-7.573-22.08zm68.537-16.044c0-6.44 2.268-11.405 6.782-14.849 4.536-3.444 10.183-5.176 16.944-5.176 6.354 0 12.174 1.518 17.478 4.578v11.724c-4.342-2.054-9.284-3.081-14.783-3.081-7.337 0-11.017 1.797-11.017 5.413 0 1.797 1.048 3.231 3.123 4.257 2.097 1.027 4.643 1.926 7.638 2.696a60.695 60.695 0 018.985 3.145c2.996 1.326 5.541 3.573 7.638 6.718 2.118 3.144 3.166 7.145 3.166 12.022 0 5.349-2.182 9.798-6.546 13.329-4.365 3.53-10.12 5.306-17.308 5.306-7.338 0-14.099-1.733-20.282-5.22v-13.671c5.628 3.787 11.66 5.669 18.1 5.669 4.408 0 7.295-.513 8.622-1.54 1.347-1.026 2.011-2.568 2.011-4.621 0-1.904-1.049-3.423-3.167-4.579-2.097-1.154-4.642-2.161-7.637-3.016a97.8 97.8 0 01-8.943-3.06c-2.995-1.176-5.54-3.101-7.637-5.819-2.119-2.717-3.167-6.119-3.167-10.225z"
        ></path>
        <path
          fill="#866AFB"
          d="M73.182 16.18h47.904a50.414 50.414 0 0126.772 7.672c.594.37 1.304.365 1.892-.015a1.73 1.73 0 00.791-1.718c-.107-.792-.162-1.6-.162-2.422 0-9.918 8.041-17.959 17.959-17.959 9.917 0 17.959 8.041 17.959 17.959s-8.042 17.959-17.959 17.959c-.822 0-1.63-.056-2.422-.162a1.729 1.729 0 00-1.718.791 1.73 1.73 0 00-.015 1.892 50.42 50.42 0 017.671 26.772v47.904l-16.407-4.397c-7.036-1.883-11.762-8.043-11.762-15.326V66.949c0-6.198-2.549-11.848-6.65-15.949-4.101-4.101-9.752-6.65-15.949-6.65H92.904c-7.282 0-13.442-4.727-15.326-11.762L73.182 16.18z"
        ></path>
        <path
          fill="#FE466C"
          d="M186.523 76.129v44.925a64.915 64.915 0 01-7.135 29.646l4.792 17.882 3.319 12.387c.503 1.88.004 3.746-1.373 5.122-1.377 1.377-3.24 1.876-5.122 1.373l-12.385-3.317-17.881-4.793a64.907 64.907 0 01-29.654 7.139H76.16c-1.703 0-3.169-.724-4.207-2.076-1.038-1.351-1.356-2.955-.915-4.6l5.76-21.494h44.288a36.867 36.867 0 0016.947-4.115c2.435-1.256 4.947-1.526 7.592-.817l10.651 2.853-2.855-10.654c-.709-2.645-.439-5.157.817-7.592a36.874 36.874 0 004.116-16.944V76.768l21.494-5.76c1.645-.441 3.248-.123 4.6.915 1.352 1.037 2.075 2.503 2.075 4.206z"
        ></path>
        <path
          fill="#06CBAD"
          d="M66.981 1.511h44.924c1.703 0 3.169.724 4.207 2.076 1.038 1.351 1.356 2.955.915 4.6l-5.76 21.494H66.981a36.861 36.861 0 00-16.946 4.113c-2.435 1.256-4.947 1.526-7.593.818l-10.651-2.854 2.853 10.654c.709 2.645.437 5.157-.819 7.59a36.858 36.858 0 00-4.113 16.946v44.288l-21.495 5.761c-1.645.441-3.248.122-4.6-.915-1.351-1.038-2.075-2.504-2.075-4.207V66.95A64.908 64.908 0 018.679 37.3L3.886 19.418.569 7.03C.065 5.151.565 3.285 1.941 1.909 3.318.532 5.183.033 7.063.536l12.386 3.319 17.884 4.791a64.927 64.927 0 0129.648-7.135z"
        ></path>
        <path
          fill="#F6CD01"
          d="M114.887 171.819l-47.904.003c-9.793 0-18.976-2.828-26.772-7.713a1.727 1.727 0 00-1.894.012 1.732 1.732 0 00-.791 1.722c.111.803.167 1.622.167 2.456 0 9.921-8.042 17.961-17.959 17.961s-17.959-8.042-17.959-17.959 8.039-17.959 17.961-17.959c.832 0 1.653.056 2.456.166a1.73 1.73 0 001.722-.79c.38-.588.384-1.299.012-1.894-4.885-7.797-7.711-16.98-7.711-26.772V73.149l16.41 4.399c7.035 1.886 11.76 8.044 11.76 15.326v28.178c0 6.234 2.526 11.88 6.594 15.948l.056.056a22.5 22.5 0 0015.948 6.594h28.18c7.282 0 13.442 4.725 15.326 11.76l4.398 16.409z"
        ></path>
        <path
          fill="#F77148"
          d="M114.885 171.819H73.184l3.616-13.496h34.469l3.616 13.496z"
        ></path>
        <path
          fill="#1BBA18"
          d="M29.712 76.766v34.47l-13.497 3.617V73.149l13.497 3.617z"
        ></path>
        <path
          fill="#347E96"
          d="M111.269 29.681H76.798L73.182 16.18h41.703l-3.616 13.501z"
        ></path>
        <path
          fill="#06CBAD"
          d="M55.898 73.694c-9.846 0-17.827-7.983-17.827-17.827 0-9.847 7.981-17.829 17.827-17.829 9.845 0 17.828 7.982 17.828 17.829 0 9.844-7.983 17.827-17.828 17.827z"
        ></path>
        <path
          fill="#FE466C"
          d="M132.225 114.365c9.845 0 17.828 7.983 17.828 17.829 0 9.844-7.983 17.827-17.828 17.827-9.845 0-17.827-7.983-17.827-17.827 0-9.846 7.982-17.829 17.827-17.829z"
        ></path>
        <path
          fill="#A13D86"
          d="M171.854 73.149v41.704l-13.5-3.617V76.768l13.5-3.619z"
        ></path>
      </g>
    </svg>
  );
}

export default hot(Topbar);