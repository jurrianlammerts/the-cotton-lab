<ul className="list">
  {staticLinks.map(link => (
    <LeftMenuLink
      location={location}
      iconName={link.icon}
      label={messages[link.label].id}
      key={link.label}
      destination={link.destination}
    />
  ))}
</ul>
