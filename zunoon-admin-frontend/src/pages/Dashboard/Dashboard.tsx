import React, { useEffect, useState } from "react";
import Charts from "./Charts/Charts";

import { BsThreeDotsVertical } from "react-icons/bs";
import { FcBarChart } from "react-icons/fc";
import { TiChartLine } from "react-icons/ti";
import BubbleChart from "./Charts/BubbleChart";
import Loader from "../../components/Loader/Loader";

import "./Dashboard.scss";
import { getUser } from "../../utils/storage";
import useFetch from "../../hooks/useFetch";
import config from "../../config";

import { withTranslation } from "react-i18next";

// data types
import { ISchool } from "../../@types/school";
import { ICourse } from "../../@types/course";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import CalendarComponent from "../Calendar/CalendarComponent";

const Dashboard: React.FC<{ t: Function }> = ({ t }) => {
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    setUserDetail(getUser());
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <section className="dashboard_header">
          <div className="dashboard_title">
            <h3>{t("dashboard_title")}</h3>
            <p>
              {t("dashboard_subtitle")},
              <span style={{ textTransform: "capitalize", marginLeft: "6px" }}>{userDetail?.username}</span>!
            </p>
          </div>
          {/* <div className="dashboard_status_container">
            <div className="dashboard_status dashboard_subject_status">
              <div className="status_info subject_status">
                <h6>{t("dashboard_skill")}</h6>
                <p>142</p>
              </div>
              <div className="status_image">
                <FcBarChart />
              </div>
            </div>
            <div className="dashboard_status dashboard_subject_status">
              <div className="status_info subject_status">
                <h6>{t("dashboard_indicator")}</h6>
                <p>1,857</p>
              </div>
              <div className="status_info status_image">
                <FcBarChart />
              </div>
            </div>
            <div className="dashboard_status dashboard_subject_status">
              <div className="status_info subject_status">
                <h6>{t("dashboard_lesson")}</h6>
                <p>20,857</p>
              </div>
              <div className="status_image">
                <FcBarChart />
              </div>
            </div>
          </div> */}
        </section>
        <section className="label_card_container">
          <TotalSchoolsComponent title={`${t("total")} ${t("sidebar_schools")}`} />
          <TotalCoursesComponent title={`${t("total")}  ${t("sidebar_courses")}`} />
          <div className="label_card">
            <div className="card_status">
              <h6>{t("total")}  {`${t("dashboard_contents")}`}</h6>
              <p>400</p>
            </div>
            <div className="card_increment_pic">
              <TiChartLine />
              {100}
            </div>
          </div>
          <div className="label_card">
            <div className="card_status">
              <h6>{t("total")}  {`${t("dashboard_students")}`}</h6>
              <p>2000</p>
            </div>
            <div className="card_increment_pic">
              <TiChartLine />
              {300}
            </div>
          </div>
        </section>
        <section className="graph_section">
          <div className="user_graph dashboard_card">
            <div className="user_graph_header">
              <h4>{t("dashboard_newUsers")}</h4>
            </div>
            <div className="user_graph_wrapper">
              <Charts />
            </div>
          </div>
          {/* <div className="recent_activity_container dashboard_card"> */}
          {/* <div className="recent_activity_header">
              <h4>{t("dashboard_recentActivity")}</h4>
              <div className="menu_button_container">
                <BsThreeDotsVertical />
              </div>
            </div>
            <div className="recent_activity_card_container">
              <div className="recent_activity_card">
                <div className="card_profile">
                  <i className="fas fa-bookmark"></i>
                </div>
                <div className="card_body">
                  <div className="recent_activity_name">
                    Added new School : Little Angels Secondary School
                    <span className="recent_activity_time">22 Nov 2022</span>
                  </div>
                  <div className="recent_activity_description">
                    Kathmandu Metropolitan City, Nepal
                  </div>
                </div>
              </div>
              <div className="recent_activity_card">
                <div className="card_profile">
                  <i className="fas fa-bookmark"></i>
                </div>
                <div className="card_body">
                  <div className="recent_activity_name">
                    Content Manager Ram Thapa promoted to School Manager
                    <span className="recent_activity_time">22 Oct 2022</span>
                  </div>
                  <div className="recent_activity_description">
                    By Super Admin Hari Bahadur
                  </div>
                </div>
              </div>
              <div className="recent_activity_card">
                <div className="card_profile">
                  <i className="fas fa-bookmark"></i>
                </div>
                <div className="card_body">
                  <div className="recent_activity_name">
                    10 new contents added to Unit : Mechanics
                    <span className="recent_activity_time">1 Jan 2021</span>
                  </div>
                  <div className="recent_activity_description">
                    By Content Manager Shyam Lal
                  </div>
                </div>
              </div>
              <div className="recent_activity_card">
                <div className="card_profile">
                  <i className="fas fa-bookmark"></i>
                </div>
                <div className="card_body">
                  <div className="recent_activity_name">
                    Added new School : Little Angels Secondary School
                    <span className="recent_activity_time">22 Nov 2022</span>
                  </div>
                  <div className="recent_activity_description">
                    Kathmandu Metropolitan City, Nepal
                  </div>
                </div>
              </div>
              <div className="recent_activity_card">
                <div className="card_profile">
                  <i className="fas fa-bookmark"></i>
                </div>
                <div className="card_body">
                  <div className="recent_activity_name">
                    15 new contents added to Unit : Thermodynamics
                    <span className="recent_activity_time">22 Oct 2022</span>
                  </div>
                  <div className="recent_activity_description">
                    By Super Admin Hari Bahadur
                  </div>
                </div>
              </div>
            </div> */}
          <div className="recent_activity_container dashboard_card dashboard_calendar">
            <div className="dashboard_calendar_header">
              <h1>{t("calendar")}</h1>
              <Link className="view_all" to="/calendar">
                {t("view_all")}
              </Link>
            </div>
            <CalendarComponent />
          </div>

          {/* </div> */}
        </section>
        <section className="top_game_container">
          <div className="top_game_chart dashboard_card">
            <div className="top_game_header">
              <h4>{t("dashboard_studentInvolvement")}</h4>
            </div>
            <BubbleChart />
          </div>
          <div className="top_country dashboard_card">
            <div className="top_country_header">
              <h4>{t("dashboard_schoolrank")}</h4>
            </div>
            <div className="top_country_card_container">
              <div className="top_country_card">
                <div className="country_name">New Summit School</div>
                <div className="country_rank">1</div>
              </div>
              <div className="top_country_card">
                <div className="country_name">Budhanilkantha School</div>
                <div className="country_rank">2</div>
              </div>
              <div className="top_country_card">
                <div className="country_name">Gyan Udaya Secondary School</div>
                <div className="country_rank">10</div>
              </div>
              <div className="top_country_card">
                <div className="country_name">Gyan Bhumi School</div>
                <div className="country_rank">120</div>
              </div>
              <div className="top_country_card">
                <div className="country_name">Nepali School</div>
                <div className="country_rank">122</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default withTranslation()(Dashboard);

const TotalSchoolsComponent = title => {
  const schoolApi = config.endpoints.api.school;

  const { fetchedData, fetchNewData, loading } = useFetch();
  const [schools, setSchools] = useState<ISchool[]>([]);

  useEffect(() => {
    fetchNewData(schoolApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData.data) {
      setSchools(fetchedData.data);
    }
  }, [fetchedData]);

  return (
    <div className="label_card">
      <div className="card_status">
        <h6>{title?.title}</h6>
        {loading ? (
          <span>
            <Loader />
          </span>
        ) : (
          <span>{schools?.length}</span>
        )}
      </div>
      <div className="card_increment_pic">
        <TiChartLine />
        {4}
      </div>
    </div>
  );
};

const TotalCoursesComponent = title => {
  const courseApi = config.endpoints.api.course;

  const [courses, setCourse] = useState<ICourse[]>([]);
  const { fetchedData, fetchNewData, loading } = useFetch();

  useEffect(() => {
    fetchNewData(courseApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData.data) {
      setCourse(fetchedData.data);
    }
  }, [fetchedData]);

  return (
    <div className="label_card">
      <div className="card_status">
        <h6>{title?.title}</h6>
        {loading ? (
          <span>
            <Loader />
          </span>
        ) : (
          <p>{courses?.length}</p>
        )}
      </div>
      <div className="card_increment_pic">
        <TiChartLine />
        {20}
      </div>
    </div>
  );
};
