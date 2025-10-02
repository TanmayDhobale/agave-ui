# Agave Validator Dashboard

A simplified validator dashboard for Agave, forked from the Firedancer dashboard UI.

## Overview

This dashboard connects to the `agave-dashboard-agent` via WebSocket to display real-time validator metrics. Unlike Firedancer which pushes metrics directly to the UI, Agave uses a sidecar agent that pulls from Prometheus and pushes to the UI.

## Features

- **Real-time metrics**: Version, bank slot, and fork count from Agave validator
- **WebSocket connection**: Connects to `agave-dashboard-agent` running on `127.0.0.1:9400`
- **Simplified UI**: Focused on core Agave metrics without FD-specific features
- **Auto-reconnection**: Handles connection failures gracefully

## Quick Start

1. **Start the Agave agent**:

   ```bash
   AGAVE_AGENT_BIND=127.0.0.1:9402 cargo run -p agave-dashboard-agent
   ```

2. **Start the UI**:

   ```bash
   npm install
   npm run dev
   ```

3. **Open your browser** to `http://localhost:5173`

## Configuration

The WebSocket URL can be configured via:

- Environment variable: `VITE_AGAVE_AGENT_WS=ws://127.0.0.1:9402/ws`
- URL parameter: `?ws=ws://localhost:9402/ws`

## Architecture

```
Agave Validator → Prometheus → agave-dashboard-agent → WebSocket → Agave UI
```

The agent scrapes metrics from Agave's Prometheus endpoint and broadcasts them to connected UI clients via WebSocket.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Message Format

The agent sends JSON messages in this format:

```json
{
  "version": "3.1.0",
  "bank_slot": 123456,
  "forks": 4
}
```

## Differences from Firedancer

- **Simplified data model**: Only version, bank_slot, and forks
- **WebSocket-only**: No HTTP/GraphQL API calls
- **No FD-specific features**: PACK/TILE regime, QUIC internals, Jito bundles hidden
- **Agave branding**: Custom logo and color scheme
- **Coming soon placeholders**: For complex features not yet implemented

## Troubleshooting

- **Connection issues**: Ensure `agave-dashboard-agent` is running on port 9400
- **No data**: Check that Agave validator is running and exposing Prometheus metrics
- **WebSocket errors**: Verify the agent WebSocket URL in browser dev tools
