'use client';
import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';
import { motion, LayoutGroup } from 'motion/react';

const COLORS = [
	{ label: 'red', value: 'hsl(348deg 100% 60%)' },
	{ label: 'yellow', value: 'hsl(50deg 100% 55%)' },
	{ label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
	const id = React.useId();
	const [timerRunning, setTimerRunning] = React.useState(false);
	const [timeElapsed, setTimeElapsed] = React.useState(0);

	const selectedColor = COLORS[timeElapsed % COLORS.length];

	React.useEffect(() => {
		if (timerRunning) {
			const intervalId = setInterval(() => {
				setTimeElapsed((value) => value + 1);
			}, 1000);

			return () => {
				clearInterval(intervalId);
			};
		}
	}, [timerRunning]);

	function handleToggleTimer() {
		setTimerRunning(!timerRunning);
	}

	function handleResetTimer() {
		setTimerRunning(false);
		setTimeElapsed(0);
	}

	return (
		<LayoutGroup>
			<Card as="section" className={styles.wrapper}>
				<ul className={styles.colorsWrapper}>
					{COLORS.map((color, index) => {
						const isSelected = color.value === selectedColor.value;

						return (
							<li className={styles.color} key={index}>
								{isSelected && (
									<motion.div
										layoutId={`${id}-outline`}
										className={styles.selectedColorOutline}
									/>
								)}
								<div
									className={clsx(
										styles.colorBox,
										isSelected && styles.selectedColorBox,
									)}
									style={{
										backgroundColor: color.value,
									}}
								>
									<VisuallyHidden>{color.label}</VisuallyHidden>
								</div>
							</li>
						);
					})}
				</ul>

				<div className={styles.timeWrapper}>
					<dl className={styles.timeDisplay}>
						<dt>Time Elapsed</dt>
						<dd>{timeElapsed}</dd>
					</dl>
					<div className={styles.actions}>
						<button
							type="button"
							aria-pressed={timerRunning}
							onClick={handleToggleTimer}
						>
							{timerRunning ? <Pause /> : <Play />}
							<VisuallyHidden>Play</VisuallyHidden>
						</button>
						<button type="button" onClick={handleResetTimer}>
							<RotateCcw />
							<VisuallyHidden>Reset</VisuallyHidden>
						</button>
					</div>
				</div>
			</Card>
		</LayoutGroup>
	);
}

export default CircularColorsDemo;
