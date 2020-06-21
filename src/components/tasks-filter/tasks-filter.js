import React from 'react';
import './tasks-filter.css';

export default function Footer() {
    return (
        <ul className="filters">
            <li>
              <button className="selected">All</button>
            </li>
            <li>
              <button>Active</button>
            </li>
            <li>
              <button>Completed</button>
            </li>
        </ul>
    );
}