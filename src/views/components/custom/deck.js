
import React, { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'

import styles from '../../../scss/deck.module.css';
import bronzecuptrophy from "../../../assets/img/bronzecuptrophy.png";
import silvercuptrophy from "../../../assets/img/silvercuptrophy.png";
import goldcuptrophy from "../../../assets/img/goldcuptrophy.png";

const cards = [
  'http://localhost:3000/Award-5.jpg', //bronze
  'http://localhost:3000/silvertrophy.jpg',
  'http://localhost:3000/2.jpg', // gold
]

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})
const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

function Deck(props) {
  const {style} = props;
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [pros, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })
    if (!down && gone.size === cards.length)
      setTimeout(() => {
        gone.clear()
        api.start(i => to(i))
      }, 600)
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className={styles.container}  style={style}>
      {pros.map(({ x, y, rot, scale }, i) => (
        <animated.div className={styles.deck} key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
              //backgroundSize: "300px 350px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center"
            }}
          >
                {i == 0 && <>
              <h5 style={{position:"absolute",bottom:"0", left: "22px"}}>Meilleur performance de la semaine</h5>
              <h3 style={{marginTop: "10px"}}>x1</h3>
              </>
              }
                {i == 1 && <>
              <h5 style={{position:"absolute",bottom:"0", left: "22px"}}>Meilleur performance du mois</h5>
              <h3 style={{marginTop: "10px"}}>x2</h3>
              </>
              }
                {i == 2 && <>
              <h5 style={{position:"absolute",bottom:"0", left: "22px"}}>Meilleur performance de la l'année</h5>
              <h3 style={{marginTop: "10px"}}>x5</h3>
              </>
              }
          </animated.div>
        </animated.div>
      ))}
      </div>
  )
}

export default Deck;