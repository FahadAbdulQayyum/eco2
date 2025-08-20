# Deployment Guide - Build Timer

## How the Build Timer Works

The build timer shows how long your website has been live since the last deployment. It automatically updates every second and resets only when you deploy a new build.

## Automatic Setup (Recommended)

The build timer is automatically configured when you run:

```bash
npm run build
```

This will:
1. Generate a build timestamp file (`src/lib/buildInfo.ts`)
2. Create environment variables (`.env.local`)
3. Build your Next.js application

## Manual Setup for Different Platforms

### Vercel
Add this build command in your Vercel dashboard:
```bash
npm run prebuild && npm run build
```

### Netlify
In your `netlify.toml`:
```toml
[build]
  command = "npm run prebuild && npm run build"
```

### Custom Server
Run the build script manually before deployment:
```bash
node scripts/build.js
npm run build
```

## How It Works

1. **Build Time**: When you run `npm run build`, the `prebuild` script generates a timestamp
2. **Runtime**: The BuildTimer component reads this timestamp and calculates time since deployment
3. **Reset**: Timer only resets when you deploy a new build (new timestamp is generated)

## Customization

### Change Timer Position
Edit `src/components/ui/BuildTimer.tsx` and modify the CSS styles.

### Change Timer Format
Modify the `getTimeSinceBuild` function in the same file.

### Add More Build Info
Edit `scripts/build.js` to include additional build metadata.

## Troubleshooting

### Timer Shows Wrong Time
- Check that `src/lib/buildInfo.ts` was generated during build
- Verify the timestamp in the file is correct
- Rebuild the application

### Timer Not Updating
- Ensure the component is properly imported in your layout
- Check browser console for errors
- Verify Redux store is working

## Example Output

The timer will show:
- **Collapsed**: Small "Live" button with clock icon
- **Expanded**: "Live Since: 15d 8h 32m 45s"

This represents 15 days, 8 hours, 32 minutes, and 45 seconds since your last deployment.

