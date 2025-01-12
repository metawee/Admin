import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { KeenIcon } from '@/components';
import { toAbsoluteUrl } from '@/utils/Assets';

const Branding = () => {
  return (
    <Fragment>
      <style>
        {`
          .branding-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-5.png')}');
          }
          .dark .branding-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-5-dark.png')}');
          }
        `}
      </style>

      <div className="card min-w-full">
        <div className="card-header gap-2">
          <h3 className="card-title">Branding</h3>
        </div>

        <div className="card-body lg:py-7.5 py-5">
          <div className="flex flex-wrap md:flex-nowrap gap-5 lg:gap-14">
            <div className="flex flex-col max-w-72 w-full">
              <div className="text-gray-900 text-sm font-medium">Company Logo</div>
              <span className="text-gray-700 text-2sm">Emblematic Corporate Identity Symbol</span>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap w-full gap-5 lg:gap-7.5">
              <img
                src={toAbsoluteUrl('/media/brand-logos/hex-lab.svg')}
                className="h-[35px] mt-2"
                alt=""
              />
              
            </div>
          </div>

          <div className="border-t border-gray-200 my-7.5"></div>

          <div className="flex flex-wrap md:flex-nowrap gap-5 lg:gap-14">
            <div className="flex flex-col max-w-72 w-full">
              <div className="text-gray-900 text-sm font-medium">Brand Color</div>
              <span className="text-gray-700 text-2sm">Signature Palette Branding Element</span>
            </div>

            <label className="input">
              <KeenIcon icon="mouse-square" className="text-success" />
              <input type="text" value="#BA35A0" readOnly />
            </label>
          </div>

          <div className="border-t border-gray-200 my-7.5"></div>

          <div className="flex flex-wrap md:flex-nowrap gap-5 lg:gap-14">
            <div className="flex flex-col max-w-72 w-full">
              <div className="text-gray-900 text-sm font-medium">Branding</div>
              <span className="text-gray-700 text-2sm">Comprehensive Image Identity Design</span>
            </div>

            <div className="flex flex-col gap-5 grow">
              <div className="flex flex-col gap-2.5">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked
                    value="1"
                    readOnly
                  />
                  <span className="checkbox-label">Emails</span>
                </label>
                <div className="form-hint">Electronic Message Communication</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 my-7.5"></div>

          <div className="flex justify-end">
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { Branding };
