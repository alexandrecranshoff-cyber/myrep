import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	spring,
	Sequence,
	random,
} from 'remotion';
import {
	TransitionSeries,
	springTiming,
	linearTiming,
} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';

const Particle: React.FC<{seed: string; delay: number}> = ({seed, delay}) => {
	const frame = useCurrentFrame();
	const x = random(seed + '-x') * 1920;
	const startY = 1080 + random(seed + '-startY') * 200;
	const size = 4 + random(seed + '-size') * 12;
	const speed = 2 + random(seed + '-speed') * 4;
	const opacity = interpolate(frame - delay, [0, 20, 80, 100], [0, 0.8, 0.8, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const y = startY - (frame - delay) * speed;

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width: size,
				height: size,
				borderRadius: '50%',
				backgroundColor: `hsl(${random(seed + '-hue') * 60 + 200}, 80%, 70%)`,
				opacity,
			}}
		/>
	);
};

const Scene1: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleScale = spring({fps, frame, config: {damping: 12, mass: 0.5}});
	const titleY = interpolate(frame, [0, 30], [50, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const subtitleOpacity = interpolate(frame, [25, 50], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const lineWidth = interpolate(frame, [15, 45], [0, 400], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{Array.from({length: 30}).map((_, i) => (
				<Particle key={i} seed={`p1-${i}`} delay={i * 2} />
			))}
			<div style={{textAlign: 'center', zIndex: 1}}>
				<div
					style={{
						fontSize: 100,
						fontWeight: 900,
						color: 'white',
						fontFamily: 'sans-serif',
						transform: `scale(${titleScale}) translateY(${titleY}px)`,
						textShadow: '0 0 40px rgba(100, 100, 255, 0.5)',
					}}
				>
					Remotion
				</div>
				<div
					style={{
						width: lineWidth,
						height: 3,
						background: 'linear-gradient(90deg, transparent, #7c6cff, transparent)',
						margin: '20px auto',
					}}
				/>
				<div
					style={{
						fontSize: 36,
						color: '#a8a4ff',
						fontFamily: 'sans-serif',
						opacity: subtitleOpacity,
						letterSpacing: 8,
					}}
				>
					VIDEO AVEC REACT
				</div>
			</div>
		</AbsoluteFill>
	);
};

const Scene2: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const items = ['Animations', 'Transitions', 'Composants', 'Rendu'];
	const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff'];

	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 100,
			}}
		>
			<div
				style={{
					display: 'flex',
					gap: 40,
					justifyContent: 'center',
					flexWrap: 'wrap',
				}}
			>
				{items.map((item, i) => {
					const delay = i * 8;
					const scale = spring({
						fps,
						frame: frame - delay,
						config: {damping: 12},
					});
					const rotation = interpolate(frame - delay, [0, 20], [15, 0], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});

					return (
						<div
							key={item}
							style={{
								width: 300,
								height: 200,
								borderRadius: 20,
								background: `linear-gradient(135deg, ${colors[i]}22, ${colors[i]}44)`,
								border: `2px solid ${colors[i]}88`,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								transform: `scale(${scale}) rotate(${rotation}deg)`,
							}}
						>
							<span
								style={{
									fontSize: 36,
									fontWeight: 700,
									color: colors[i],
									fontFamily: 'sans-serif',
								}}
							>
								{item}
							</span>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

const Scene3: React.FC = () => {
	const frame = useCurrentFrame();

	const radius = 250;
	const dotCount = 12;

	const pulse = interpolate(frame, [0, 30, 60], [1, 1.15, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const textOpacity = interpolate(frame, [20, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(135deg, #0a0a1a, #1a0a2e)',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div style={{position: 'relative', width: 600, height: 600}}>
				{Array.from({length: dotCount}).map((_, i) => {
					const angle = (i / dotCount) * Math.PI * 2 + frame * 0.03;
					const x = 300 + Math.cos(angle) * radius * pulse;
					const y = 300 + Math.sin(angle) * radius * pulse;
					const size = 16 + Math.sin(frame * 0.1 + i) * 6;
					const hue = (i / dotCount) * 360;

					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: x - size / 2,
								top: y - size / 2,
								width: size,
								height: size,
								borderRadius: '50%',
								backgroundColor: `hsl(${hue}, 80%, 65%)`,
								boxShadow: `0 0 20px hsl(${hue}, 80%, 65%)`,
							}}
						/>
					);
				})}
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						fontSize: 48,
						fontWeight: 800,
						color: 'white',
						fontFamily: 'sans-serif',
						textAlign: 'center',
						opacity: textOpacity,
					}}
				>
					Infini
				</div>
			</div>
		</AbsoluteFill>
	);
};

const Scene4: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = spring({fps, frame, config: {damping: 10, mass: 0.8}});
	const glow = interpolate(frame, [0, 30, 60], [0, 1, 0.6], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{Array.from({length: 20}).map((_, i) => (
				<Particle key={i} seed={`p4-${i}`} delay={i * 3} />
			))}
			<div
				style={{
					textAlign: 'center',
					transform: `scale(${scale})`,
					zIndex: 1,
				}}
			>
				<div
					style={{
						fontSize: 80,
						fontWeight: 900,
						color: 'white',
						fontFamily: 'sans-serif',
						textShadow: `0 0 ${glow * 60}px rgba(120, 100, 255, ${glow})`,
					}}
				>
					Merci !
				</div>
				<div
					style={{
						fontSize: 28,
						color: '#a8a4ff',
						fontFamily: 'sans-serif',
						marginTop: 20,
						opacity: interpolate(frame, [30, 50], [0, 1], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Fait avec Remotion + React
				</div>
			</div>
		</AbsoluteFill>
	);
};

export const MyComp: React.FC = () => {
	return (
		<TransitionSeries>
			<TransitionSeries.Sequence durationInFrames={90}>
				<Scene1 />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				timing={springTiming({config: {damping: 200}})}
				presentation={fade()}
			/>
			<TransitionSeries.Sequence durationInFrames={75}>
				<Scene2 />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				timing={linearTiming({durationInFrames: 20})}
				presentation={wipe()}
			/>
			<TransitionSeries.Sequence durationInFrames={75}>
				<Scene3 />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				timing={springTiming({config: {damping: 200}})}
				presentation={fade()}
			/>
			<TransitionSeries.Sequence durationInFrames={75}>
				<Scene4 />
			</TransitionSeries.Sequence>
		</TransitionSeries>
	);
};
