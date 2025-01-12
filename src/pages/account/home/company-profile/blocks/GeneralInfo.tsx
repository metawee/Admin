import { KeenIcon } from '@/components';

const GeneralInfo = () => {
  return (
    <div className="card min-w-full">
      <div className="card-header">
        <h3 className="card-title">General Info</h3>
      </div>

      <div className="card-table scrollable-x-auto pb-3">
        <table className="table align-middle text-sm text-gray-500" id="general_info_table">
          <tbody>
            <tr>
              <td className="min-w-56 text-gray-600 font-normal">Name</td>
              <td className="min-w-48 w-full text-gray-800 font-normal">Hexlab</td>
              <td className="min-w-16 text-center">
                <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                  <KeenIcon icon="notepad-edit" />
                </a>
              </td>
            </tr>

            <tr>
              <td className="min-w-56 text-gray-600 font-normal">Display Name</td>
              <td className="min-w-48 w-full text-gray-800 font-normal">Hexlab</td>
              <td className="min-w-16 text-center">
                <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                  <KeenIcon icon="notepad-edit" />
                </a>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal">Phone number</td>
              <td className="text-gray-800 font-normal">+1 555-1234</td>
              <td className="text-center">
                <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                  <KeenIcon icon="notepad-edit" />
                </a>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal">VAT number</td>
              <td className="text-gray-800 font-normal">
                <span className="badge badge-sm badge-outline badge-danger">Missing Details</span>
              </td>
              <td className="text-center">
                <a href="#" className="btn btn-link btn-sm">
                  Add
                </a>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal">Registration number</td>
              <td className="text-gray-800 font-normal">IYS2023A56789</td>
              <td className="text-center">
                <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                  <KeenIcon icon="notepad-edit" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { GeneralInfo };
