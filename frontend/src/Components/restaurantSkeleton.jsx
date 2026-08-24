function RestaurantSkeleton({ count = 4 }) {
  return (
    <div className="restaurant-skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="restaurant-skeleton-card"
          key={index}
        >
          {/* Image */}
          <div className="skeleton skeleton-image"></div>

          {/* Content */}
          <div className="skeleton-content">

            <div className="skeleton skeleton-title"></div>

            <div className="skeleton skeleton-text"></div>

            <div className="skeleton skeleton-small"></div>

            <div className="skeleton skeleton-footer"></div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default RestaurantSkeleton;