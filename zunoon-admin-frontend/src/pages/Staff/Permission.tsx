import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation, withTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import Button from "../../components/Button/Button";
import config from "../../config";
import http from "../../utils/http";
import toast from "../../utils/toast";
import "./Permission.scss";
import useFetch from "../../hooks/useFetch";
import ErrorPages from "../../components/ErrorPages/ErrorPages";

function CheckAccord({ register, setValue, data, id, defPermissions }) {
  const [permissions, setPermissions] = useState(defPermissions);
  const name = data?.name?.toLowerCase();

  function setCheckAll(val) {
    const ele = document.querySelectorAll<HTMLInputElement>(`input[name^='${name}.']`);

    let currPermission = permissions || [];

    for (let i = 0; i < ele?.length; i++) {
      if (ele[i].type == "checkbox") {
        ele[i].checked = val;
        setValue(ele[i].name, val);

        if (val) {
          currPermission = [...currPermission, Number(ele[i].id)];
        } else {
          const newPermissions = currPermission?.filter(id => id !== Number(ele[i].id));
          currPermission = newPermissions;
        }
      }
    }

    setPermissions(currPermission);
  }

  function isAllChecked() {
    let isAllChecked = true;
    const ele = document.querySelectorAll<HTMLInputElement>(`input[name^='${name}.']`);

    for (let i = 0; i < ele?.length; i++) {
      isAllChecked = isAllChecked && ele[i].checked;
    }

    return isAllChecked;
  }

  useEffect(() => {
    const isAllCheck = isAllChecked();
    const checkbox = document.getElementById(`${data.name}Perms`) as HTMLInputElement;
    checkbox.checked = isAllCheck;
  }, []);

  const allPermsId = data?.permissions?.map(each => each.id);

  const activeKey = allPermsId?.filter(x => defPermissions.includes(x)).length ? String(id) : null;

  const { t } = useTranslation();
  return (
    <Accordion defaultActiveKey={activeKey} className="mb-3">
      <Accordion.Item eventKey={String(id)}>
        <Accordion.Header>
          <Form.Check
            type={"checkbox"}
            id={`${data.name}Perms`}
            onClick={e => {
              e.stopPropagation();
            }}
            onChange={e => {
              e.target.checked ? setCheckAll(true) : setCheckAll(false);
            }}
          />
          <Form.Label htmlFor={`${name}Perms`}>{data?.name} {t("permissions")}</Form.Label>
        </Accordion.Header>
        <Accordion.Body style={{ marginLeft: "20px" }}>
          {data?.permissions?.map(permission => {
            return (
              <Form.Check
                className="mb-2"
                type={"checkbox"}
                name={`${name}`}
                id={`${permission?.id}`}
                key={`${name}.${permission?.id}`}
                checked={permissions?.includes(permission.id)}
                label={`${permission?.name} - ${permission?.description || "No description available"
                  }.`}
                {...register(`${name}.${permission?.id}`, {
                  required: false,
                })}
                onChange={() => {
                  if (permissions.includes(permission.id)) {
                    setPermissions(permissions?.filter(id => id !== permission?.id));
                  } else {
                    setPermissions([...permissions, permission.id]);
                  }
                  const isAllCheck = isAllChecked();
                  const checkbox = document.getElementById(
                    `${data?.name}Perms`,
                  ) as HTMLInputElement;
                  checkbox.checked = isAllCheck;
                }}
              />
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

const Permission = editform => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const navigate = useNavigate();
  const { state } = useLocation();
  const permissions = state && state?.permissions;

  const roleApi = config.endpoints.api.role;

  const [catPerms, setCatPerms] = useState([]);

  const { loading, error, fetchedData, fetchNewData } = useFetch();

  useEffect(() => {
    fetchNewData(roleApi.catPerms);
  }, [fetchNewData]);

  useEffect(() => {
    setCatPerms(fetchedData.data?.sort((a, b) => a.id - b.id));
  }, [fetchedData]);

  const { register, setValue, handleSubmit } = useForm(
    editform && {
      defaultValues: {},
    },
  );

  const handleClickSubmit = data => {
    let permissionIds = [];
    Object.keys(data).map(category => {
      const permissions = data[category];
      const trueKeys = Object.keys(permissions).filter(key => permissions[key] === true);
      permissionIds = [...permissionIds, ...trueKeys];
    });

    const permissionIdsInt = permissionIds.map(str => Number(str));

    http
      .POST(roleApi.assign(state.userId), { permissionIds: permissionIdsInt })
      .then(res => {
        toast.success("Permissions Assigned Successfully!");
        setTimeout(() => {
          navigate("../");
        }, 1000);
      })
      .catch(error => {
        toast.error(error);
      });
  };
  const { t } = useTranslation();

  return (
    <div className="permission_page_container" ref={topRef}>
      <div className="page_header">
        <h4 className="page_title mb-3">{t("assign_permissions_to")} {state?.name || "Ram"}</h4>
        <div className="button_wrapper mr-5">
          <Button
            type="button"
            color="success"
            buttonName={`< ${"back"}`}
            clickHandler={() => navigate("../")}
          />
        </div>
      </div>
      <div className="permission_page">
        <form onSubmit={handleSubmit(editform ? handleClickSubmit : handleClickSubmit)}>
          {!loading && !error && catPerms && (
            <>
              <div className="scroll_btn">
                <BsFillArrowDownCircleFill
                  onClick={() => {
                    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  size={30}
                  fill="#00bad6"
                  style={{ position: "fixed", zIndex: 99 }}
                />
              </div>
              <div className="scroll_btn">
                <BsFillArrowUpCircleFill
                  onClick={() => {
                    topRef.current?.scrollIntoView({ top: 0, behavior: "smooth" });
                  }}
                  size={30}
                  fill="#00bad6"
                  style={{ position: "fixed", bottom: 40, zIndex: 99 }}
                />
              </div>
            </>
          )}

          <div style={{ paddingRight: "40px" }}>
            {catPerms?.map((category, id) => {
              return (
                <CheckAccord
                  register={register}
                  setValue={setValue}
                  defPermissions={permissions}
                  data={category}
                  key={id}
                  id={id}
                />
              );
            })}
          </div>
          <ErrorPages isFetching={loading} data={catPerms} error={error} />
          <div className="mt-5 mb-5 permission_button" ref={bottomRef}>
            <Button type="submit" color="success" buttonName={t("submit")} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default withTranslation()(Permission);
