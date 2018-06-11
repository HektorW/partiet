import React from 'react'
import Months from '../../../constants/Months'
import WeekDays from '../../../constants/WeekDays'
import './next-match.scss'

const NextMatch = ({ match, opposition }) =>
  !match ? null : (
    <div className="next-match">
      <h2 className="next-match__heading">Nästa match är mot:</h2>

      <div className="next-match__opposition">
        <div className="next-match__opposition-name">{opposition.name}</div>

        {opposition.position && (
          <div className="next-match__opposition-position">
            Som ligger {opposition.position}:a i ligan.
          </div>
        )}
      </div>

      <div className="next-match__date">
        <span className="next-match__date-day">
          {WeekDays[match.date.getUTCDay()]}
        </span>
        <span className="next-match__date-date">{match.date.getUTCDate()}</span>
        <span className="next-match__date-month">
          {Months[match.date.getUTCMonth()]}
        </span>
      </div>
      <div className="next-match__time">
        <span className="next-match__time-hour">
          {match.date.getUTCHours()}
        </span>
        :
        <span className="next-match__time-minutes">
          {match.date.getUTCMinutes()}
        </span>
      </div>
    </div>
  )

export default NextMatch