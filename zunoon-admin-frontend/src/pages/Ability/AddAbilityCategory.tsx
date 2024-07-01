import { useState } from "react";
import "./AddAbilityCategory.scss"
import { withTranslation } from "react-i18next";
import AbilityCategoryForm from "./AbilityCategoryForm";
import { IAbilityCategory } from "../../@types/abilityCategory";



const AddAbilityCategory = ({ t, handleClickSubmit, isFormOpen, setIsFormOpen }) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    return (
        <>
            {isFormOpen && (
                <div className="add_ability_category_form">
                    <AbilityCategoryForm
                        editform={false}
                        setIsFormOpen={setIsFormOpen}
                        handleClickSubmit={(data: IAbilityCategory) => handleClickSubmit(data)}
                        isSubmitting={isSubmitting}
                    />

                </div>
            )}

        </>
    );
}

export default withTranslation()(AddAbilityCategory);
