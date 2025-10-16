Xvfb :10 -screen 0 640x480x24 -nocursor &

export DISPLAY=:10

chromium \
  --disable-gpu \
  --no-sandbox \
  --disable-web-security \
  --disable-site-isolation-trials \
  --disable-features=IsolateOrigins,site-per-process,BlockInsecurePrivateNetworkRequests \
  --allow-running-insecure-content \
  --ignore-certificate-errors \
  --user-data-dir="/tmp/react-playout-profile" \
  --window-size=640,480 \
  --kiosk \
  --app=http://localhost:5173/ \
  http://localhost:5173/ &

ffmpeg \
  -f x11grab \
  -video_size 640x480 \
  -i :10 \
  -r 25 \
  -c:v libx264 -preset ultrafast -pix_fmt yuv420p \
  -f hls \
  -hls_time 2 \
  -hls_list_size 10 \
  -hls_flags delete_segments \
  /tmp/hls/stream.m3u8