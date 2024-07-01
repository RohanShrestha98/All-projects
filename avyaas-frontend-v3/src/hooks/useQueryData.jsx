import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { privateApiRoute } from "../config/config";

export const useQueryData = (key, path, params = "", enabled = true) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: [key, params],
    refetchOnWindowFocus: false,
    queryFn: () =>
      axiosPrivate
        .get(privateApiRoute + path, {
          params,
        })
        .then((res) => res.data),
    enabled,
  });
};

// https://backend.beta.ebidhya.com/EPS-1/teacher/teacher?limit=1000

// export const useRequestData = ({
//   search = "",
//   ordering = "",
//   page = 1,
//   pageSize = 10,
//   start_date = "",
//   end_date = "",
// }) => {
//   return useQueryData(
//     [
//       "pujaRequests",
//       search,
//       ordering,
//       page,
//       pageSize,
//       start_date,
//       end_date,
//     ].filter((str) => str !== ""),
//     "puja/pujarequests/",
//     {
//       page,
//       page_size: pageSize,
//       search,
//       ordering,
//       start_date,
//       end_date,
//     },
//   );
// };

export const useCheck = () => useQueryData(["check"], "check");

export const useCourseAvailable = () =>
  useQueryData(["course-enrolled"], "course/enrolled/");

export const useCourseGroup = () =>
  useQueryData(["course-group"], "course-group/list/");

export const useCourseList = ({ courseGroupID }) =>
  useQueryData(
    ["course-group", courseGroupID],
    `course/list/?courseGroupID=${courseGroupID}`,
    "",
    !!courseGroupID
  );

export const useSubjectListByCourse = ({ courseID }) =>
  useQueryData(["subject", courseID], `subject/list/?courseID=${courseID}`);

export const useSubjectDetails = (subjectID) =>
  useQueryData(["subject-details", subjectID], `subject/details/${subjectID}/`);

export const useChapterListByUnit = (unitID) =>
  useQueryData(["chapter-list", unitID], `chapter/list/?unitID=${unitID}/`);

export const useContentDetails = (contentID) =>
  useQueryData(["content-details", contentID], `content/details/${contentID}/`);

export const useLiveList = (courseID) =>
  useQueryData(["live", courseID], `live/list/?courseID=${courseID}`);

export const usePlanList = (courseID) =>
  useQueryData(["plan-list", courseID], `package/list/?courseID=${courseID}`);

export const useTestDetails = (testID) =>
  useQueryData(["test-details", testID], `test/details/${testID}`);

export const useBookmarkData = (bookmarkType) =>
  useQueryData(
    ["bookmark", bookmarkType],
    `bookmark/list/?bookmarkType=${bookmarkType}`
  );

export const useCourseAccess = (moduleId) =>
  useQueryData(
    ["course-access", moduleId],
    `${moduleId}/access`,
    "",
    !!moduleId
  );

export const usePractice = (moduleId) =>
  useQueryData(["practice", moduleId], `${moduleId}/practice`);

export const useSubjectData = (courseID) =>
  useQueryData(["subject", courseID], `subject/list/?courseID=${courseID}`);

export const useUnitData = (moduleId, id) =>
  useQueryData(
    ["practice-allUnit", moduleId, id],
    `${moduleId}/practice/allUnit?subjectId=${id}`
  );

export const useUnitDetails = (moduleId, unitId, subjectId) =>
  useQueryData(
    ["practice-detail", moduleId, unitId, subjectId],
    `${moduleId}/practice/detail?unitId=${unitId}&subjectId=${subjectId}`
  );

export const useTeacher = (courseID) =>
  useQueryData(["teacher", courseID], `teacher/list/?courseID=${courseID}`);

export const useAnnouncement = (moduleId) =>
  useQueryData(
    ["announcement", moduleId],
    `${moduleId}/announcement`,
    "",
    !!moduleId
  );

export const useDashboardAnswer = (moduleId) =>
  useQueryData(
    ["dashboard-answer", moduleId],
    `${moduleId}/dashboard/answer`,
    "",
    !!moduleId
  );

export const useQbankSubject = (moduleId) =>
  useQueryData(
    ["qbank-subject", moduleId],
    `${moduleId}/qbank/subject`,
    "",
    !!moduleId
  );

export const useTest = (courseID) =>
  useQueryData(["test", courseID], `test/list/?courseID=${courseID}`);

export const useTestTypeList = () =>
  useQueryData(["test-type-list"], `test-type/list/`);

export const useRecentTest = (moduleId) =>
  useQueryData("recent-test", `${moduleId}/test/recent`, "", !!moduleId);

export const useRecentDiscussion = (moduleId) =>
  useQueryData("recent-discussion", `${moduleId}/discussion/recent`);

export const useDiscussion = (subjectID) =>
  useQueryData(
    ["discussion", subjectID],
    `discussion/list/${subjectID === "all" ? "" : `?subjectID=${subjectID}`}`
  );

export const useDiscussionReply = (discussionId) =>
  useQueryData(
    ["discussion-reply", discussionId],
    `reply/list/?discussionID=${discussionId}`
  );

export const usePoll = (subjectID) =>
  useQueryData(
    ["poll", subjectID],
    `poll/list/${subjectID === "all" ? "" : `?subjectID=${subjectID}`}`
  );

export const usePollSubject = (moduleId) =>
  useQueryData(["poll-subject"], `${moduleId}/poll/subject`, "", !!moduleId);

export const useAchieverSubject = (moduleId) =>
  useQueryData("achievers-subject", `${moduleId}/poll/achievers`);

export const useLastPayment = (moduleId) =>
  useQueryData("last-payment", `${moduleId}/payment/last`);

export const useSingleVideoDetail = (moduleId, videoId, subjectId) =>
  useQueryData(
    ["single-video-detail", videoId, subjectId],
    `${moduleId}/video/single?id=${videoId}&subjectId=${subjectId}`
  );

export const useVideoComment = (moduleId, videoId) =>
  useQueryData(
    ["video-comment", videoId],
    `${moduleId}/video/comment?videoId=${videoId}`
  );

export const useQbankStat = (moduleId) =>
  useQueryData(["qbank-stat"], `api/v1/${moduleId}/qbank/stat`);

export const useTestStat = (moduleId) =>
  useQueryData(["test-stat"], `api/v1/${moduleId}/test/user/stat`);

export const usePlanType = (moduleId) =>
  useQueryData(["plan-type"], `${moduleId}/payment/type`);
