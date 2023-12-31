import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "@/components/Header";

type tripType = {
  destination_city: string;
  id: string;
  destination_country: string;
  duration: string;
  imageUrl: string;
  free_food: boolean;
  price: number;
  date: Date;
  date_uploaded: Date;
  description: string;
  travel_by: string;
};

export default function Trip() {
  const [booked, setBooked] = useState<Boolean>();

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [trip, setTrip] = useState<tripType | null>(null);
  const [deletePopUp, setDeletePopUp] = useState(false);

  let tripDate = trip?.date.toString().split("T")[0];

  useEffect(() => {
    setToken(localStorage.getItem("jwt_token"));
  }, []);

  // get user books when page loaded

  useEffect(() => {
    const getUser = async () => {

      try {

        const response = await axios.get("https://trippy-jt62.onrender.com/user", {
          headers: {
            authorization: token,
          },
        });

        const isBooked = response.data.user.booked_trips.includes(router.query.id)
        setBooked(isBooked);
   

      } catch (error) {

            


        localStorage.removeItem("jwt_token");
        localStorage.removeItem("jwt_refresh_token");
        setToken(null)
        router.reload()
      


      }





    };

    if (token) {
      getUser();
    }
  }, [token, booked]);

  const handleDelete = () => {
    setDeletePopUp(!deletePopUp);
  };

  const deleteFromDb = async () => {
    const response = await axios.delete(
      `https://trippy-jt62.onrender.com/deleteTrip/${router.query.id}`
    );

    if ((response.status = 200)) {
      setDeletePopUp(!deletePopUp);
      router.push("/");
    }
  };

  const bookTrip = async () => {

    if (booked) {
      try {
        const response = await axios.delete(
          `https://trippy-jt62.onrender.com/removeUserTrip/${router.query.id}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        setBooked(false)

      } catch (error) {
        console.log("something went wrong", error);
      }
    } else {
      try {
        const response = await axios.post(
          `https://trippy-jt62.onrender.com/addTripToUser/${router.query.id}`,
          {},
          {
            headers: {
              authorization: token,
            },
          }
        );

        setBooked(true)
      } catch (error) {
        console.log("something went wrong", error);
      }
    }
  };


  useEffect(() => {
    const getTrip = async () => {
      try {
        const response = await axios.get(
          `https://trippy-jt62.onrender.com/trip/${router.query.id}`
        );
        setTrip(response.data.trip[0]);
      } catch (error) {
        console.log("Error when getting a trip", error);
      }
    };

    getTrip();
  }, []);

  console.log("currently token is", token)

  return (
    <div>
      <Header></Header>
      {trip && (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={trip.imageUrl}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {trip.destination_country}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {trip.destination_city}
                </h1>
                <div className="flex mb-4">
                  <div className="lg:flex  gap-x-1.5 items-center text-gray-800 lg:flex-row lg:items-center sm:grid sm:grid-cols-2">
                    {trip.travel_by === "train" ? (
                      <div className="train flex gap-x-1.5	">
                        <svg
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="25px"
                          height="25px"
                          viewBox="0 0 65 61"
                          enable-background="new 0 0 65 61"
                        >
                          <title>Train</title>
                          <desc>Created with Sketch.</desc>
                          <path
                            id="Shape_5_"
                            fill="none"
                            stroke="#6B6C6E"
                            stroke-width="2"
                            stroke-linejoin="round"
                            d="M55,55.9
                        h7.7L58,42v-8c-0.3-1.1-1-5-1-5v-2h1c1.1,0,1-0.9,1-2v-1c0-1.1,0.1-2-1-2h-7c-1.1,0-1,0.9-1,2v1c0,1.1-0.1,2,1,2h1v5h-7v-3h-4v3h-5
                        v-3h-4v3h-5v-8h0.9c1.1,0,1-0.9,1-2v-3c0-1.1,0.1-2-1-2H4c-1.1,0-1,0.9-1,2v3c0,1.1-0.1,2,1,2h1v13.9H2c-1.1,0-1,0.9-1,2v9
                        c0,1.1-0.1,2,1,2h3"
                          />
                          <path
                            id="Shape"
                            fill="none"
                            stroke="#6B6C6E"
                            stroke-width="2"
                            d="M39.8,54.9h4"
                          />
                          <path
                            id="Shape_1_"
                            fill="none"
                            stroke="#6B6C6E"
                            stroke-width="2"
                            d="M22.103,54.9H28"
                          />
                          <rect
                            id="Rectangle-path"
                            x="9"
                            y="25"
                            fill="none"
                            stroke="#6B6C6E"
                            stroke-width="2"
                            stroke-linejoin="round"
                            width="5"
                            height="11.9"
                          ></rect>
                          <rect
                            id="Rectangle-path_1_"
                            x="18"
                            y="25"
                            fill="none"
                            stroke="#6B6C6E"
                            stroke-width="2"
                            stroke-linejoin="round"
                            width="5"
                            height="7"
                          ></rect>
                          <path
                            id="Shape_2_"
                            fill="none"
                            stroke="#6B6C6E"
                            stroke-width="2"
                            stroke-linejoin="round"
                            d="
                        M21.9,46.9h37.8"
                          />
                          <path
                            id="Shape_3_"
                            fill="none"
                            stroke="#6B6C6E"
                            stroke-width="2"
                            d="M52.8,11.4h-0.1
                        c0.1-0.3,0.1-0.6,0.1-0.9c0-1.6-1.1-2.9-2.6-3.2c-0.2-1.8-1.8-3.2-3.8-3.2H46C45.2,2.3,43.3,1,41.1,1c-3,0-5.1,1.8-5.1,4.7
                        c0,3.7,3,5.1,5.2,5.1c0.6,1.1,1.7,1.8,3.1,1.8c0.7,0,1.4-0.2,2-0.6c0.6,1.1,1.7,1.9,3.1,1.9c0.6,0,1.2-0.1,1.6-0.4
                        c0.1,0.9,0.9,1.6,1.8,1.6c1,0,1.9-0.8,1.9-1.8C54.6,12.2,53.8,11.4,52.8,11.4L52.8,11.4z"
                          />
                          <path
                            id="Shape_4_"
                            fill="none"
                            stroke="#6B6C6E"
                            stroke-width="2"
                            stroke-linejoin="round"
                            d="M14,42
                        h44"
                          />
                          <circle
                            id="Oval"
                            fill="none"
                            stroke="#6B6C6E"
                            stroke-width="2"
                            stroke-linejoin="round"
                            cx="14"
                            cy="51"
                            r="9"
                          ></circle>
                          <circle
                            id="Oval_1_"
                            fill="none"
                            stroke="#6B6C6E"
                            stroke-width="2"
                            stroke-linejoin="round"
                            cx="34"
                            cy="54"
                            r="6"
                          ></circle>
                          <circle
                            id="Oval_2_"
                            fill="none"
                            stroke="#6B6C6E"
                            stroke-width="2"
                            stroke-linejoin="round"
                            cx="50"
                            cy="54"
                            r="6"
                          ></circle>
                        </svg>
                        <span className="xl:mt-0"> By train </span>
                      </div>
                    ) : (
                      <div className="plane flex gap-x-1.5">
                        <svg
                          width="25px"
                          height="25px"
                          viewBox="0 0 32 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="icomoon-ignore"></g>
                          <path
                            d="M9.123 30.464l-1.33-6.268-6.318-1.397 1.291-2.475 5.785-0.316c0.297-0.386 0.96-1.234 1.374-1.648l5.271-5.271-10.989-5.388 2.782-2.782 13.932 2.444 4.933-4.933c0.585-0.585 1.496-0.894 2.634-0.894 0.776 0 1.395 0.143 1.421 0.149l0.3 0.070 0.089 0.295c0.469 1.55 0.187 3.298-0.67 4.155l-4.956 4.956 2.434 13.875-2.782 2.782-5.367-10.945-4.923 4.924c-0.518 0.517-1.623 1.536-2.033 1.912l-0.431 5.425-2.449 1.329zM3.065 22.059l5.63 1.244 1.176 5.544 0.685-0.372 0.418-5.268 0.155-0.142c0.016-0.014 1.542-1.409 2.153-2.020l5.978-5.979 5.367 10.945 1.334-1.335-2.434-13.876 5.349-5.348c0.464-0.464 0.745-1.598 0.484-2.783-0.216-0.032-0.526-0.066-0.87-0.066-0.593 0-1.399 0.101-1.881 0.582l-5.325 5.325-13.933-2.444-1.335 1.334 10.989 5.388-6.326 6.326c-0.483 0.482-1.418 1.722-1.428 1.734l-0.149 0.198-5.672 0.31-0.366 0.702z"
                            fill="#000000"
                          ></path>
                        </svg>

                        <span className="xl:mt-0"> By plane </span>
                      </div>
                    )}

                    <div className="flex  gap-x-1.5 items-center text-gray-800 xl:flex-row xl:items-center">
                      <svg
                        height="20px"
                        mr-3
                        inline-block
                        h-5
                        w-5
                        width="20px"
                        version="1.1"
                        id="_x32_"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <g>
                          <path
                            className="st0"
                            d="M506.051,138.383c-3.349-7.072-7.991-13.715-13.682-19.95c-9.965-10.911-23.143-20.61-38.908-29.166
		c-23.633-12.824-53.12-23.102-86.649-30.25C333.27,51.871,295.697,47.882,256,47.882c-34.578,0-67.536,3.028-97.608,8.522
		c-45.129,8.27-83.75,21.986-111.848,39.921c-14.049,8.978-25.498,19.052-33.639,30.351c-4.071,5.65-7.297,11.613-9.516,17.868
		C1.185,150.799,0,157.334,0,163.991c-0.013,8.869,2.097,17.527,5.936,25.593c2.764,5.82,6.398,11.354,10.782,16.608l130.58,178.798
		v28.922c0,4.39,1.116,8.672,3.022,12.483c1.675,3.335,3.907,6.344,6.521,9.074c4.602,4.785,10.4,8.78,17.112,12.259
		c10.101,5.2,22.367,9.23,36.212,12.048c13.844,2.797,29.255,4.342,45.51,4.342c14.172,0,27.689-1.164,40.078-3.328
		c9.298-1.614,17.97-3.778,25.811-6.439c11.789-4.009,21.754-9.053,29.364-15.512c3.798-3.234,7.011-6.862,9.366-11.041
		c2.342-4.152,3.772-8.931,3.758-13.886v-28.908l131.247-178.845c1.32-1.6,2.614-3.206,3.798-4.86
		c4.056-5.65,7.297-11.619,9.516-17.868c2.206-6.249,3.39-12.796,3.39-19.44C512,155.114,509.89,146.456,506.051,138.383z
		 M344.705,413.912c-0.013,1.191-0.272,2.375-0.994,3.846c-0.626,1.28-1.66,2.743-3.158,4.308c-2.614,2.743-6.698,5.717-12.02,8.461
		c-8.005,4.138-18.718,7.766-31.174,10.271c-12.457,2.519-26.656,3.968-41.684,3.968c-13.083,0-25.525-1.089-36.757-3.043
		c-8.413-1.463-16.145-3.403-22.911-5.704c-10.168-3.418-18.146-7.719-23.02-11.905c-2.436-2.084-4.098-4.091-5.05-5.8
		c-0.953-1.722-1.266-3.063-1.28-4.404v-19.038c9.556,5.526,21.468,9.964,35.19,13.225c15.968,3.765,34.306,5.888,53.828,5.888
		c29.772-0.006,56.74-4.9,76.848-13.136c4.411-1.818,8.454-3.819,12.184-5.976V413.912z M344.719,378.646
		c-0.926,0.742-1.934,1.47-2.995,2.185c-8.236,5.575-20.502,10.598-35.327,14.083c-14.812,3.499-32.182,5.534-50.723,5.534
		c-28.234,0.013-53.786-4.765-71.688-12.136c-7.174-2.928-13.055-6.29-17.398-9.728L67.958,243.534
		c21.877,10.591,48.015,19.195,77.229,25.43c33.53,7.133,71.103,11.115,110.813,11.115c34.564,0,67.522-3.015,97.608-8.508
		c34.442-6.316,65.086-15.812,90.175-27.928L344.719,378.646z M113.495,174.153c11.64,7.147,28.398,15.288,49.131,19.249
		l0.163-0.912c1.144,3.601,2.382,7.222,3.785,10.864c1.783,4.629,3.812,9.284,6.099,13.94c-27.05-4.622-50.288-14.907-67.278-24.565
		c-9.624-5.466-17.248-10.714-22.434-14.573c-0.708-0.531-1.361-1.014-1.96-1.491c3.812-4.186,8.795-8.358,14.934-12.347
		c0.654-0.408,1.334-0.83,2.001-1.253C100.93,165.556,106.212,169.667,113.495,174.153z M110.95,155.999
		c12.034-5.758,26.505-10.863,42.8-14.988c0.558,11,2.029,23.912,5.269,37.682c-15.887-3.872-28.997-10.346-38.39-16.124
		C116.735,160.165,113.482,157.905,110.95,155.999z M414.801,165.855c3.525,2.423,6.697,4.901,9.379,7.42
		c2.314,2.137,4.274,4.309,5.935,6.48c-39.887,3.008-68.488,14.634-87.33,25.968c-14.008,8.399-22.612,16.587-26.682,20.944
		c-3.036-2.464-5.936-5.023-8.685-7.644c-4.138-3.928-7.964-8.018-11.504-12.204c3.512-3.288,11.926-10.366,26.138-17.698
		c19.359-9.958,49.458-20.379,92.789-22.149L414.801,165.855z M436.445,192.98c0.273,1.478,0.463,2.948,0.463,4.432
		c0,3.995-0.993,7.909-3.076,11.952c-3.635,7.045-10.822,14.376-21.25,21.142c-8.208,5.35-18.392,10.319-30.14,14.737
		c-6.371,1.694-12.919,3.274-19.685,4.71c-1.212,0.259-2.478,0.483-3.703,0.735c-11.952-4.227-22.516-9.658-31.896-15.893
		c3.866-3.955,11.49-10.836,23.496-17.929C368.664,206.233,396.49,195.152,436.445,192.98z M314.838,177.543
		c-13.859,7.249-22.707,14.342-27.268,18.48c-6.004-8.414-10.946-16.962-15.016-25.158l0.517,0.51l0.027-0.027l0.04-0.04
		c0.749-0.728,7.637-7.344,22.272-14.097c14.049-6.473,35.258-13.076,65.126-14.668c9.04,2.485,17.48,5.262,25.185,8.297
		c3.227,1.273,6.289,2.6,9.244,3.962C359.067,158.572,332.766,168.156,314.838,177.543z M287.406,145.959
		c-10.006,4.84-16.662,9.605-20.42,12.66c-0.694-1.674-1.361-3.335-1.974-4.941c-3.744-9.727-6.153-18.188-7.637-24.239
		c22.448,0.137,43.917,1.852,63.71,4.853C307.228,137.533,296.051,141.767,287.406,145.959z M262.508,181.143
		c8.29,15.818,19.752,32.72,35.531,47.735c10.278,9.795,22.448,18.78,36.674,26.09c-14.144,2.097-28.901,3.635-44.134,4.581
		c-15.261-8.583-27.58-18.929-37.532-30.194c-16.037-18.126-26.015-38.621-32.21-57.428c-5.105-15.506-7.596-29.827-8.807-40.588
		c10.168-0.933,20.652-1.552,31.406-1.797C245.777,139.976,251.222,159.566,262.508,181.143z M216.018,196.833
		c6.453,14.014,15.138,28.295,26.832,41.528c6.943,7.862,14.988,15.336,24.205,22.149c-3.676,0.075-7.351,0.15-11.054,0.15
		c-11.204,0-22.204-0.361-32.999-0.994c-9.53-7.841-17.466-16.356-24.068-25.232c-12.933-17.405-20.788-36.239-25.471-53.998
		c-4.125-15.641-5.759-30.426-6.235-42.5c9.91-2.07,20.366-3.798,31.27-5.153C200.308,148.914,204.8,172.444,216.018,196.833z
		 M98.684,204.559c20.148,11.435,48.586,23.782,82.279,27.642c2.178,3.478,4.52,6.936,7.052,10.34
		c3.907,5.268,8.277,10.401,13.082,15.376c-13.546-1.361-26.682-3.178-39.22-5.465c-15.724-2.866-30.549-6.446-44.285-10.612
		c-14.157-6.058-25.511-13.022-33.257-20.27c-4.356-4.05-7.569-8.175-9.652-12.204c-2.083-4.044-3.077-7.957-3.09-11.952
		c0.014-3.125,0.654-6.214,1.919-9.346C79.08,192.293,87.616,198.283,98.684,204.559z M488.489,181.266
		c-1.116,2.382-2.518,4.778-4.138,7.168l-0.027-0.034l-3.526,4.799c-0.884,1.082-1.797,2.164-2.777,3.246
		c-8.032,8.815-19.495,17.412-33.816,25.185c-1.076,0.579-2.178,1.15-3.281,1.722c1.92-2.485,3.594-5.057,4.983-7.726
		c2.954-5.704,4.615-11.871,4.615-18.215c0-6.33-1.661-12.504-4.615-18.201c-5.214-9.999-14.199-18.65-25.92-26.295
		c-14.675-9.515-33.802-17.472-56.182-23.585l-0.014-0.565c-0.585,0.021-1.157,0.055-1.742,0.088
		c-3.907-1.041-7.896-2.041-11.98-2.974c-28.344-6.426-61.002-10.074-95.811-10.074c-53.052,0.013-101.093,8.44-136.461,22.387
		c-17.697,6.997-32.25,15.349-42.746,25.137c-5.241,4.888-9.475,10.17-12.442,15.881c-2.968,5.696-4.615,11.871-4.615,18.201
		c0,6.344,1.647,12.51,4.615,18.215c0.83,1.593,1.797,3.144,2.818,4.676c-2.928-1.641-5.759-3.315-8.427-5.017
		c-10.85-6.943-19.495-14.376-25.662-21.89l-3.634-4.982l-0.041,0.034c-2.6-3.852-4.602-7.684-5.949-11.496
		c-1.525-4.315-2.287-8.597-2.287-12.96c0-5.827,1.334-11.503,4.07-17.282c2.382-5.058,5.882-10.142,10.482-15.18
		c8.032-8.821,19.494-17.418,33.816-25.185c21.482-11.674,49.362-21.495,81.435-28.322c32.087-6.834,68.366-10.7,106.77-10.7
		c33.434,0,65.262,2.926,94.109,8.202c43.277,7.882,79.856,21.141,104.878,37.164c12.51,7.998,22.094,16.65,28.329,25.341
		c3.132,4.35,5.446,8.692,6.97,12.994c1.525,4.315,2.274,8.597,2.274,12.967C492.56,169.803,491.226,175.487,488.489,181.266z"
                          />
                          <path
                            className="st0"
                            d="M379.228,317.488c4.643-1.368,7.284-6.228,5.909-10.864c-1.361-4.635-6.222-7.276-10.85-5.908
		c-4.629,1.361-7.284,6.235-5.908,10.864C369.74,316.208,374.6,318.856,379.228,317.488z"
                          />
                          <path
                            className="st0"
                            d="M185.156,311.008c-4.792-0.653-9.202,2.702-9.856,7.481c-0.653,4.792,2.696,9.196,7.488,9.849
		c4.778,0.66,9.189-2.696,9.843-7.481C193.283,316.073,189.934,311.669,185.156,311.008z"
                          />
                          <path
                            className="st0"
                            d="M337.422,309.048c-4.765,0.796-7.978,5.309-7.174,10.074c0.803,4.765,5.309,7.977,10.074,7.167
		c4.765-0.796,7.977-5.316,7.174-10.074C346.693,311.451,342.173,308.244,337.422,309.048z"
                          />
                          <path
                            className="st0"
                            d="M147.842,304.065c-4.683-1.15-9.421,1.729-10.564,6.426c-1.144,4.683,1.743,9.421,6.425,10.564
		c4.697,1.144,9.421-1.736,10.564-6.425C155.411,309.933,152.538,305.209,147.842,304.065z"
                          />
                          <path
                            className="st0"
                            d="M299.59,313.731c-4.819,0.395-8.386,4.621-7.991,9.434c0.394,4.812,4.628,8.393,9.434,7.991
		c4.819-0.402,8.386-4.622,7.991-9.434C308.629,316.909,304.396,313.336,299.59,313.731z"
                          />
                          <path
                            className="st0"
                            d="M223.151,314.643c-4.819-0.279-8.958,3.41-9.23,8.229c-0.272,4.826,3.404,8.958,8.222,9.23
		c4.819,0.286,8.958-3.404,9.244-8.23C231.66,319.053,227.97,314.922,223.151,314.643z"
                          />
                          <path
                            className="st0"
                            d="M261.391,315.507c-4.833,0.055-8.7,4.016-8.644,8.842c0.068,4.826,4.016,8.706,8.848,8.638
		c4.833-0.055,8.699-4.009,8.644-8.842C270.185,319.319,266.224,315.453,261.391,315.507z"
                          />
                        </g>
                      </svg>
                      <span className="mt-0">
                        {" "}
                        {trip.free_food ? "Free Food " : "No Free Food"}
                      </span>
                    </div>

                    <div className="flex  gap-x-1.5 items-center text-gray-800 xl:flex-row xl:items-center">
                      <svg
                        fill="#000000"
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                      >
                        <path d="m22 2.25h-3.25v-1.5c-.014-.404-.344-.726-.75-.726s-.736.322-.75.725v.001 1.5h-4.5v-1.5c-.014-.404-.344-.726-.75-.726s-.736.322-.75.725v.001 1.5h-4.5v-1.5c-.014-.404-.344-.726-.75-.726s-.736.322-.75.725v.001 1.5h-3.25c-1.104 0-2 .895-2 1.999v17.75c0 1.105.895 2 2 2h20c1.105 0 2-.895 2-2v-17.75c0-1.104-.896-1.999-2-1.999zm.5 19.75c0 .276-.224.499-.499.5h-20.001c-.276 0-.5-.224-.5-.5v-17.75c.001-.276.224-.499.5-.499h3.25v1.5c.014.404.344.726.75.726s.736-.322.75-.725v-.001-1.5h4.5v1.5c.014.404.344.726.75.726s.736-.322.75-.725v-.001-1.5h4.5v1.5c.014.404.344.726.75.726s.736-.322.75-.725v-.001-1.5h3.25c.276 0 .499.224.499.499z" />
                        <path d="m5.25 9h3v2.25h-3z" />
                        <path d="m5.25 12.75h3v2.25h-3z" />
                        <path d="m5.25 16.5h3v2.25h-3z" />
                        <path d="m10.5 16.5h3v2.25h-3z" />
                        <path d="m10.5 12.75h3v2.25h-3z" />
                        <path d="m10.5 9h3v2.25h-3z" />
                        <path d="m15.75 16.5h3v2.25h-3z" />
                        <path d="m15.75 12.75h3v2.25h-3z" />
                        <path d="m15.75 9h3v2.25h-3z" />
                      </svg>
                      <span className="mt-0"> {tripDate}</span>
                    </div>

                    <div className="flex  gap-x-1.5 items-center text-gray-800 xl:flex-row xl:items-center">
                      <svg
                        version="1.1"
                        id="HOURGLASS"
                        width="25px"
                        height="25px"
                        viewBox="0 0 1800 1800"
                        enable-background="new 0 0 1800 1800"
                      >
                        <g>
                          <path
                            fill="#333333"
                            d="M1291.915,534.357v-332.82h205.125c17.342,0,31.397-14.056,31.397-31.396V33.361
                            c0-17.34-14.056-31.396-31.397-31.396H302.959c-17.34,0-31.396,14.055-31.396,31.396v136.779c0,17.341,14.056,31.396,31.396,31.396
                            h205.126v332.82c0,163.429,98.684,304.023,239.057,364.271c-140.373,60.465-239.057,201.569-239.057,365.587v334.248H302.959
                            c-17.34,0-31.396,14.056-31.396,31.396v136.779c0,17.34,14.056,31.396,31.396,31.396H1497.04c17.342,0,31.397-14.056,31.397-31.396
                            v-136.779c0-17.34-14.056-31.396-31.397-31.396h-205.125v-334.248c0-164.019-98.686-305.122-239.057-365.587
                            C1193.229,838.381,1291.915,697.787,1291.915,534.357z M334.355,64.758h1131.289v73.987H1260.52H539.48H334.355V64.758z
                            M1229.124,201.537v301.424H570.876V201.537H1229.124z M624.024,1591.386L900,1365.789l275.973,225.597H624.024z
                            M1465.645,1735.243H334.355v-73.987H539.48h721.039h205.125V1735.243z M1229.124,1264.216v289.515l-309.252-252.802
                            c-11.559-9.447-28.183-9.447-39.742,0L570.876,1553.73v-289.515c0-184.304,147.644-334.248,329.124-334.248
                            C1081.477,929.968,1229.124,1079.912,1229.124,1264.216z M900,867.177c-171.004,0-311.915-132.581-327.617-301.424h655.234
                            C1211.914,734.596,1071.004,867.177,900,867.177z"
                          />
                          <path
                            fill="#333333"
                            d="M900,1172.91c17.34,0,31.396-14.056,31.396-31.397v-105.4c0-17.34-14.056-31.396-31.396-31.396
                            c-17.34,0-31.396,14.056-31.396,31.396v105.4C868.604,1158.854,882.66,1172.91,900,1172.91z"
                          />
                        </g>
                      </svg>
                      <span className="mt-0"> {trip.duration + " days"}</span>
                    </div>
                  </div>
                </div>
                <p className="leading-relaxed">{trip.description}</p>
                <div className="mt-6  pb-5 border-b-2 border-gray-200 mb-5"></div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    {trip.price} €{" "}
                  </span>
                  {token ? (
                    <button
                      onClick={bookTrip}
                      className="flex ml-auto text-white bg-green-400 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {booked ? "Unbook" : "Book"}
                    </button>
                  ) : (
                    <span className="flex ml-auto self-center">
                      Login To Book This Trip
                    </span>
                  )}

                  <button
                    onClick={handleDelete}
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  >
                    <svg width="25px" height="25px" viewBox="0 0 1024 1024">
                      <path
                        fill="#000000"
                        d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {deletePopUp && (
        <div
          className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 flex items-center text-red-500 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <h3 className="text-xl font-bold py-4 ">Are you sure?</h3>
                <p className="text-sm text-gray-500 px-8">
                  Do you really want to delete this trip? This process cannot be
                  undone
                </p>
              </div>

              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={handleDelete}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteFromDb}
                  className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
