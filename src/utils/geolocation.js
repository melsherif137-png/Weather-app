export const DEFAULT_LOCATION = {
  name: "Cairo",
  lat: 30.0444,
  lon: 31.2357,
};

const DEFAULT_LOCATION_TIMEOUT = 6000;

export const getUserLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(DEFAULT_LOCATION);
      return;
    }

    let isResolved = false;

    const resolveLocation = (location) => {
      if (isResolved) return;
      isResolved = true;
      resolve(location);
    };

    const fallbackTimer = setTimeout(() => {
      console.warn("Using Cairo as default location: permission timed out");
      resolveLocation(DEFAULT_LOCATION);
    }, DEFAULT_LOCATION_TIMEOUT);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(fallbackTimer);
        resolveLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        clearTimeout(fallbackTimer);
        console.warn("Using Cairo as default location:", error.message);
        resolveLocation(DEFAULT_LOCATION);
      },
      {
        timeout: DEFAULT_LOCATION_TIMEOUT,
      },
    );
  });
};
