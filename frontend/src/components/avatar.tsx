function Avatar({avatarUrl, initials}: { avatarUrl?: string, initials: string }) {
  if (avatarUrl) {
    return (
      <img
        src={`${avatarUrl}`}
        width={56}
        height={56}
        alt=""
        className="w-14 rounded-full"/>
    );
  }
  return (
    <div className="avatar placeholder">
      <div className="w-14 rounded-full bg-base-300 text-base-content">
        <span>{initials}</span>
      </div>
    </div>
  );
}

export default Avatar;