import { WeatherApiResponse } from '@openmeteo/sdk/weather-api-response';
import { format } from 'date-fns';
import { fetchWeatherApi } from 'openmeteo';
import { useEffect, useState } from 'react';

import type { Route } from './+types/home';

interface IWebcam {
	videoUrl: string;
	lat: number;
	lon: number;
	elevation: number;
	name: string;
	url?: string;
	logoUrl?: string;
	lineOne?: string;
	lineTwo?: string;
}

export function meta({}: Route.MetaArgs) {
	return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

const WEBCAMS: IWebcam[] = [
	// {
	// 	videoUrl: '/video-proxy/streams/latest/1/5761.mp4?dcsdesign=WTP_feratel.com',
	// 	name: 'Sölden',
	// 	lat: 46.9422356,
	// 	lon: 10.9566443,
	// 	elevation: 3040,
	// 	logoUrl: 'https://wtvlogo.feratel.com/vlogo/1485957364000/B48438E5-88DD-4352-846F-F038E36D90AD.png',
	// },
	// {
	// 	videoUrl: '/video-proxy/streams/latest/1/5770.mp4?dcsdesign=WTP_feratel.com',
	// 	name: 'Therme Längenfeld',
	// 	lat: 47.069672,
	// 	lon: 10.962142,
	// 	elevation: 1165,
	// 	logoUrl: 'https://wtvlogo.feratel.com/vlogo/1667561598000/73F46D70-EC61-4E52-84E3-C752396FF29B.png',
	// },
	{
		videoUrl: '/video-proxy/streams/latest/1/8020.mp4?dcsdesign=WTP_feratel.com',
		name: 'Dilsen-Stokkem',
		lat: 51.0390945,
		lon: 5.6706113,
		elevation: 40,
		lineOne: 'Visitor Center',
		lineTwo: 'De Wissen',
	},
	{
		videoUrl: '/video-proxy/streams/latest/1/8087.mp4?dcsdesign=WTP_feratel.com',
		name: 'Maasmechelen',
		lat: 50.9613335,
		lon: 5.6402933,
		elevation: 60,
		lineOne: 'St. Barbarakirche',
		// lineTwo: '',
	},
	{
		videoUrl: '/video-proxy/streams/latest/1/8050.mp4?dcsdesign=WTP_feratel.com',
		name: 'Lubbeek',
		lat: 50.8817301,
		lon: 4.8089648,
		elevation: 45,
		lineOne: 'Craywinckelhof',
		lineTwo: 'De Wissen',
	},
	{
		videoUrl: '/video-proxy/streams/latest/1/8087.mp4?dcsdesign=WTP_feratel.com',
		name: 'De Haan',
		lat: 51.26734,
		lon: 3.0085622,
		elevation: 5,
		// lineOne: 'Craywinckelhof',
		// lineTwo: 'De Wissen',
	},
	{
		videoUrl: '/video-proxy/streams/latest/1/8037.mp4?dcsdesign=WTP_feratel.com',
		name: 'Zeebrugge',
		lat: 51.3189124,
		lon: 3.1681947,
		elevation: 3,
		lineOne: 'Zeedijk',
		// lineTwo: 'De Wissen',
	},
];

export default function Home() {
	const [weatherData, setWeatherData] = useState<WeatherApiResponse>();
	const [activeWebcamIndex, setActiveWebcamIndex] = useState<number>(0);
	const activeWebcam = WEBCAMS[activeWebcamIndex];

	useEffect(() => {
		(async () => {
			const params = {
				latitude: activeWebcam.lat,
				longitude: activeWebcam.lon,
				daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
				current: ['temperature_2m', 'relative_humidity_2m', 'weather_code'],
				timezone: 'Europe/Berlin',
			};
			const url = 'https://api.open-meteo.com/v1/forecast';
			const responses = await fetchWeatherApi(url, params);

			setWeatherData(responses[0]);
		})();
	}, [activeWebcam]);

	return (
		<div className="flex h-screen w-full items-center justify-center overflow-hidden">
			<div className="w-[640px] h-[480px] bg-black relative overflow-hidden">
				<video
					muted
					src={activeWebcam.videoUrl}
					className="w-full h-full object-cover"
					autoPlay
					onEnded={() =>
						setActiveWebcamIndex((currentIndex) => {
							if (currentIndex + 1 === WEBCAMS.length) {
								return 0;
							}

							return currentIndex + 1;
						})
					}
				/>

				{/* Left */}
				<div className="bg-pano-blue opacity-70 absolute -left-[10px] bottom-[122px] h-[23px] w-[231px] skew-x-36"></div>
				<div className="absolute left-0 right-0 bottom-[99px] h-[23px]">
					<div className="opacity-70 from-pano-dark-blue to-pano-blue bg-linear-to-b absolute top-0 left-0 right-0 bottom-0" />
					<p className="relative text-[19px] leading-6 left-[200px] text-white text-shadow-black-bottom">{activeWebcam.url}</p>
					{!activeWebcam.logoUrl && (
						<p className="relative text-[17px] leading-6 left-[20px] text-white text-shadow-black-bottom">{activeWebcam.name}</p>
					)}
				</div>
				<div className="absolute -left-[25px] bottom-[31px] h-[68px] w-[216px]">
					<div className="absolute top-0 left-0 right-0 bottom-0 from-pano-blue to-pano-dark-blue bg-linear-to-b opacity-70 -skew-x-36" />
					{activeWebcam.logoUrl && <img className="absolute w-[100px] left-[80px] bottom-[20px]" src={activeWebcam.logoUrl} />}
				</div>
				{/* Middle bottom */}
				<div className="absolute flex flex-col justify-center right-[100px] bottom-[18px] h-[68px] w-[450px]">
					<div
						className="h-[68px] w-[450px] absolute left-0"
						style={{
							maskImage: 'linear-gradient(to right, black 75%, transparent 90%)',
							opacity: 0.5,
						}}
					>
						<div className="absolute left-[50px] h-[68px] w-[400px] -skew-x-36 bg-gradient-to-b from-pano-dark-blue to-pano-blue"></div>
					</div>
					<p className="relative text-[20px] leading-6 left-[110px] text-white text-shadow-black-bottom">{activeWebcam.lineOne}</p>
					<p className="relative text-[20px] leading-6 left-[110px] text-white text-shadow-black-bottom">{activeWebcam.lineTwo}</p>
				</div>
				{/* Right */}
				<div className="absolute -right-[10px] bottom-[122px] h-[23px] w-[150px]">
					<div className="absolute left-0 right-0 top-0 bottom-0 from-pano-dark-blue to-pano-blue bg-linear-to-b opacity-70 -skew-x-36" />
					<p className="relative text-[17px] leading-6 left-[7px] text-white text-shadow-black-bottom">{format(new Date(), 'HH:mm')}</p>
				</div>
				<div className="absolute -right-[10px] bottom-[76px] h-[23px] w-[150px]">
					<div className="absolute left-0 right-0 top-0 bottom-0 from-pano-dark-blue to-pano-blue bg-linear-to-b opacity-70 -skew-x-36" />
					<p className="relative text-[17px] leading-6 left-[7px] text-white text-shadow-black-bottom">{activeWebcam.elevation} m</p>
				</div>
				<div className="absolute -right-[10px] bottom-[53px] h-[23px] w-[150px]">
					<div className="absolute left-0 right-0 top-0 bottom-0 from-pano-dark-blue to-pano-blue bg-linear-to-b opacity-70 -skew-x-36" />
					<p className="relative text-[17px] leading-6 left-[7px] text-white text-shadow-black-bottom text-yellow-400">
						{Math.round(weatherData?.current()?.variables?.(0)?.value?.() || 0)} °C
					</p>
				</div>
				<div className="absolute -right-[10px] bottom-[30px] h-[23px] w-[150px]">
					<div className="absolute left-0 right-0 top-0 bottom-0 from-pano-dark-blue to-pano-blue bg-linear-to-b opacity-70 -skew-x-36" />
					<p className="relative text-[17px] leading-6 left-[7px] text-white text-shadow-black-bottom text-yellow-400">
						{Math.round(weatherData?.current()?.variables?.(1)?.value?.() || 0)} %
					</p>
				</div>
			</div>
		</div>
	);
}
