import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useDivDis from '../Hooks/useDivDis';
import useSearch from '../Hooks/useSearch';
import { MdBloodtype, MdDriveFileRenameOutline, MdMarkEmailUnread } from "react-icons/md";
import { IoLocationSharp } from 'react-icons/io5';

const Search = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [SelectDistrictId, setSelectedDistrictId] = useState(null);
  const [districts, upazillas, division] = useDivDis();
  const [searchParams, setSearchParams] = useState(null);

  const { blood, District, Upazila } = searchParams || {};
  const [searchRes, isPending, refetch] = useSearch(blood, District, Upazila);
  const filteredUpazillas = SelectDistrictId
    ? upazillas.filter((upazilla) => upazilla.district_id === SelectDistrictId)
    : [];

  const onSubmit = (data) => {
    console.log(data)
    const FinalData = {
      blood: data.blood,
      District: JSON.parse(data.District).name,
      Upazila: JSON.parse(data.Upazila).name,
    };
    setSearchParams(FinalData);  
    refetch();  
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 container mx-auto w-8/12 mt-20">
        <h2 className="text-2xl font-bold text-center mb-2">Find Blood Donors</h2>
        <p className="text-gray-600 text-center mb-6">
          Connect with blood donors in your area
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7 justify-center">
            {/* Blood Group Selection */}
            <div className="form-control">
              <label className="block mb-2">Blood Group</label>
              <select
                defaultValue=""
                {...register('blood', { required: true })}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>Select Blood Group:</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
              {errors.blood && <span className="text-red-600">Blood group is required</span>}
            </div>

            {/* District Selection */}
            <div>
              <label className="block mb-2">District</label>
              <select
                defaultValue=""
                className="select select-bordered w-full max-w-xs border rounded p-2"
                {...register('District', { required: 'District is required' })}
                onChange={(e) => setSelectedDistrictId(JSON.parse(e.target.value).id)}
              >
                <option disabled selected>Select Your District:</option>
                {districts.map((district) => (
                  <option key={district.id} value={JSON.stringify({ id: district.id, name: district.name })}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.District && <p className="text-red-500 text-sm">{errors.District.message}</p>}
            </div>

            {/* Upazila Selection */}
            <div>
              <label className="block mb-2">Upazila</label>
              <select
                defaultValue=""
                className="select select-bordered max-w-xs border rounded w-full p-2"
                {...register('Upazila', { required: 'Upazila is required' })}
              >
                <option disabled selected>Select Your Upazilla:</option>
                {filteredUpazillas.map((upazilla) => (
                  <option key={upazilla.id} value={JSON.stringify({ id: upazilla.id, name: upazilla.name })}>
                    {upazilla.name}
                  </option>
                ))}
              </select>
              {errors.Upazila && <p className="text-red-500 text-sm">{errors.Upazila.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <span className="text-lg">🔍</span>
            Search Donors
          </button>
        </form>
      </div>

      {/* Display Results */}
      <div className="mt-10">
        {isPending ? (
          <p className="text-center">Loading...</p>
        )
          :
          searchRes?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchRes.map((donor) => (
                <div key={donor.email} className="p-4 shadow rounded bg-white">
                  <img src={donor.image} alt={donor.name} className="w-16 h-16 rounded-full mx-auto" />
                  <div className="flex justify-start items-center mt-2">
                    <MdDriveFileRenameOutline />
                    <span className="flex gap-2">
                      Name:
                      <p className="font-bold">{donor.name}</p>
                    </span>
                  </div>
                  <div className="flex justify-start items-center mt-2">
                    <MdBloodtype />
                    <span className="flex gap-2">
                      Blood Group:
                      <p>{donor.blood}</p>
                    </span>
                  </div>
                  <div className="flex justify-start items-center mt-2">
                    <IoLocationSharp />
                    <span className="flex gap-2">
                      Location:
                      <p>{donor.District}, {donor.Upazila}</p>
                    </span>
                  </div>
                  <div className="flex justify-start items-center mt-2">
                    <MdMarkEmailUnread />
                    <span className="flex gap-2">
                      Email:
                      <p>{donor.email}</p>
                    </span>
                  </div>
                </div>
              ))}
            </div>

          )
            :
            (
              <p className="text-center text-gray-700 font-medium">No Search Results Found</p>
            )}
      </div>

    </div>
  );
};

export default Search;
