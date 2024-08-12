function Avatar({initials}: { initials: string }) {
  return (
    <div className="avatar placeholder">
      <div className="w-14 rounded-full bg-base-300 text-base-content">
        <span>{initials}</span>
      </div>
    </div>
  );
}

export default Avatar;