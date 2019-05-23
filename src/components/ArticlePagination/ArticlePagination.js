import React from 'react';
import classNames from 'classnames';

const ArticlePagination = (props) => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  const newRange = range.map(number => number + 1);

  const setPage = page => props.onSetPage(page);
  const click = (ev) => {
    ev.preventDefault();
    if (ev.target.id == 'prev') {
      var p = (props.currentPage) - 1;
    }
    else if (ev.target.id == 'next') {
      var p = (props.currentPage) + 1;
    }
    if (newRange.includes(p)) {
      setPage(p);
    }
  };

  return (
    <div>
      <ul>
        <li>
          <a
            id="prev"
            className="page-numbers"
            href=""
            className={classNames({ 'page-numbers': true })}
            onClick={click}
          >
            prev
          </a>
        </li>
        {
          range.map((v) => {
            const isCurrent = v + 1 === props.currentPage;
            const onClick = (ev) => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <li
                key={v}
              >
                <a
                  value={v.toString()}
                  href=""
                  className={classNames({ 'page-numbers': true, current: isCurrent })}
                  onClick={onClick}
                >
                  {v += 1}
                </a>
              </li>
            );
          })
        }
        <li>
          <a
            id="next"
            href=""
            className={classNames({ 'page-numbers': true })}
            onClick={click}
          >
            next
          </a>
        </li>
      </ul>

    </div>
  );
};

export default ArticlePagination;
