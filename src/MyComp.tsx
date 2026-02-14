import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

export const MyComp: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const opacity = interpolate(frame, [0, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const scale = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white',
			}}
		>
			<div
				style={{
					opacity,
					transform: `scale(${scale})`,
					fontSize: 80,
					fontWeight: 'bold',
				}}
			>
				Welcome to Remotion
			</div>
		</AbsoluteFill>
	);
};
