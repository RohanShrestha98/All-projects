interface SYSTEM_ACCESS_ID_TYPE {
  DASHBOARD: string;
  ACCOUNT: string;
  SCHOOL: string;
  COURSE: string;
  UNIT: string;
  GRADE: string;
  CAREER: string;
  SKILL: string;
  INDICATOR: string;
  LESSON: string;
  CONTENT: string;
  ABILITY: string;
  GRADE_CATEGORY: string;
  LEVEL_TYPE: string;
}

export const SYSTEM_ACCESS_ID: SYSTEM_ACCESS_ID_TYPE = {
  DASHBOARD: "dashboard",
  ACCOUNT: "user",
  SCHOOL: "school",
  COURSE: "course",
  UNIT: "unit",
  GRADE: "grade",
  CAREER: "career",
  SKILL: "skill",
  INDICATOR: "indicator",
  LESSON: "lesson",
  CONTENT: "content",
  ABILITY: "ability-category",
  GRADE_CATEGORY: "grade-category",
  LEVEL_TYPE: "levelType",
};

export const permission = (role: string) => {
  if (role === "superadmin") {
    return [
      "dashboard",
      "account",
      "school",
      "course",
      "unit",
      "grade",
      "skill",
      "indicator",
      "lesson",
      "content",
      "ability",
    ];
  } else if (role === "schoolmanager") {
    return ["dashboard", "school", "course", "grade", "skill", "indicator", "lesson"];
  } else if (role === "contentmanager") {
    return ["dashboard", "content"];
  }
};
