const AdvancedSettingsPreferences = () => {
  return (
    <div className="card">
      <div className="card-header" id="advanced_settings_preferences">
        <h3 className="card-title">Preferences</h3>
      </div>
      <div className="card-body grid gap-5 lg:py-7.5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Language</label>
          <select className="select">
            <option>American English</option>
            <option>Egypt Arabic</option>
            <option>Saudi Arabia Arabic</option>
          </select>
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Time zone</label>
          <div className="grow">
            <select className="select">
              <option>Saudi Arabia (GMT+3)</option>
              <option>Egypt (UTC+2)</option>
            </select>
          </div>
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 mb-2">
          <label className="form-label max-w-56">Currency</label>
          <div className="grow">
            <select className="select">
              <option>Egyptian pound - (EGP)</option>
              <option>Saudi riyal - (SAR)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export { AdvancedSettingsPreferences };
