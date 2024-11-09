import { ChangeEvent, FC, useState } from "react";
import styles from "./GroupEdit.module.css";
import { ChooseInterests } from "../../CreateGroup/ChooseInterests/ChooseInterests";
import { Group, Interests } from "../../../types";
import EditAvatar from "../../../assets/icons/edit_avatar_icon.svg";
import { CustomGroupAvatar } from "../../CreateGroup/CustomGroupAvatar/CustomGroupAvatar";

interface GroupEditProps {
  groupData: Group;
  dataTags: Interests[];
}

const MAX_DESCRIPTION_LENGTH = 300;

export const GroupEdit: FC<GroupEditProps> = ({ groupData, dataTags }) => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [name, setName] = useState<string>(groupData.name);
  const [chars, setChars] = useState<string>(groupData.chars);
  const [color, setColor] = useState<string>(groupData.color);
  const [description, setDescription] = useState<string>(groupData.description);
  const [selectedInterests, setSelectedInterests] = useState<Interests[]>(
    groupData?.interests || []
  );
  const [availableInterests, setAvailableInterests] = useState<Interests[]>(
    groupData
      ? dataTags.filter(
          (interest) =>
            !groupData.interests.some((tag) => tag.name === interest.name)
        )
      : dataTags
  );

  const togglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const handleCancelEditGroup = () => {
    setName(groupData.name);
    setChars(groupData.chars);
    setColor(groupData.color);
    setDescription(groupData.description);
    setSelectedInterests(groupData.interests);
    setAvailableInterests(
      dataTags.filter(
        (interest) => !groupData.interests.some((tag) => tag.name === interest.name)
      )
    );
  };

  const addInterest = (interest: Interests) => {
    setAvailableInterests((prev) =>
      prev.filter((item) => item.name !== interest.name)
    );
    setSelectedInterests((prev) => [...prev, interest]);
  };

  const removeInterest = (interest: Interests) => {
    setSelectedInterests((prev) =>
      prev.filter((item) => item.name !== interest.name)
    );
    setAvailableInterests((prev) => [...prev, interest]);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(e.target.value);
    }
  };

  return (
    <section className={styles.createGroupContainer}>
      <header className={styles.createGroupHeader}>
        <div className={styles.avatarSection}>
          <div
            className={styles.avatarPreview}
            style={{ backgroundColor: `#${color}` }}
          >
            <span className={styles.avatarText}>{chars}</span>
            <button
              onClick={togglePopup}
              className={styles.editAvatarButton}
              aria-label="Изменить аватар"
            >
              <img src={EditAvatar} alt="Изменить аватар" />
            </button>
          </div>
          {isOpenPopup && (
            <CustomGroupAvatar
              setChars={setChars}
              setColor={setColor}
              setIsOpenPopup={togglePopup}
              colorAvatar={color}
              charsAvatar={chars}
            />
          )}
        </div>
        <div className={styles.groupInfo}>
          <label className={styles.label} htmlFor="group-name">
            Название
          </label>
          <input
            id="group-name"
            type="text"
            className={styles.input}
            placeholder="Введите название группы"
            value={name}
            onChange={handleNameChange}
          />

          <label className={styles.label} htmlFor="group-description">
            Описание
          </label>
          <div className={styles.textareaContainer}>
            <textarea
              id="group-description"
              className={styles.textarea}
              placeholder="Введите описание группы"
              value={description}
              onChange={handleDescriptionChange}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              maxLength={MAX_DESCRIPTION_LENGTH}
            />
            <span
              className={styles.charCount}
            >{`${description.length}/${MAX_DESCRIPTION_LENGTH}`}</span>
          </div>
        </div>
      </header>

      <ChooseInterests
        selectedInterests={selectedInterests}
        availableInterests={availableInterests}
        removeInterest={removeInterest}
        addInterest={addInterest}
      />

      <footer className={styles.footer}>
        <button onClick={handleCancelEditGroup} className={styles.cancelButton}>
          Отменить
        </button>
        <button className={styles.createButton}>Сохранить</button>
      </footer>
    </section>
  );
};