import { USER_ROLE } from "@/contants/role";
import { DrawerItem, UserRole } from "@/types";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoKey } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { SiGooglecampaignmanager360 } from "react-icons/si";
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import { FaPersonChalkboard } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";

//icons
export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  const defaultMenus = [
    {
      title: "Profile",
      path: `${role}/profile`,
      icon: IoPersonCircleOutline,
    },
    {
      title: "Change Password",
      path: `change-password`,
      icon: IoKey,
    },
  ];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: MdDashboard,
        },
        {
          title: "Create Admin",
          path: `${role}/create-admin`,
          icon: GrUserAdmin,
        },
        {
          title: "Manage Admin",
          path: `${role}/manage-admin`,
          icon: RiAdminLine,
        },
        {
          title: "Create Author",
          path: `${role}/create-author`,
          icon: FaPersonChalkboard,
        },
        {
          title: "Manage Author",
          path: `${role}/manage-author`,
          icon: FaUsers,
        },
        {
          title: "Create Editor",
          path: `${role}/create-editor`,
          icon: FaPersonChalkboard,
        },
        {
          title: "Manage Editor",
          path: `${role}/manage-editor`,
          icon: FaUsers,
        },
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: TbUsersGroup,
        },
        {
          title: "Create Post",
          path: `${role}/create-post`,
          icon: MdPostAdd,
        },
        {
          title: "Manage Post",
          path: `${role}/manage-posts`,
          icon: BsFillPostcardHeartFill,
        },
        {
          title: "Create Category",
          path: `${role}/create-category`,
          icon: TbCategoryPlus,
        },
        {
          title: "Manage Categories",
          path: `${role}/manage-categories`,
          icon: SiGooglecampaignmanager360,
        }
      );
      break;

    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: MdDashboard,
        },
        {
          title: "Create Admin",
          path: `${role}/create-admin`,
          icon: GrUserAdmin,
        },
        {
          title: "Manage Admin",
          path: `${role}/manage-admin`,
          icon: RiAdminLine,
        },
        {
          title: "Create Author",
          path: `${role}/create-author`,
          icon: FaPersonChalkboard,
        },
        {
          title: "Manage Author",
          path: `${role}/manage-author`,
          icon: FaUsers,
        },
        {
          title: "Create Editor",
          path: `${role}/create-editor`,
          icon: FaPersonChalkboard,
        },
        {
          title: "Manage Editor",
          path: `${role}/manage-editor`,
          icon: FaUsers,
        },
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: TbUsersGroup,
        },
        {
          title: "Create Post",
          path: `${role}/create-post`,
          icon: MdPostAdd,
        },
        {
          title: "Manage Post",
          path: `${role}/manage-posts`,
          icon: BsFillPostcardHeartFill,
        },
        {
          title: "Category",
          path: `${role}/category`,
          icon: TbCategoryPlus,
        }
      
      );
      break;
    case USER_ROLE.AUTHOR:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: MdDashboard,
        },
        {
          title: "Create Post",
          path: `${role}/create-post`,
          icon: MdPostAdd,
        },
        {
          title: "My Post",
          path: `${role}/my-posts`,
          icon: BsFillPostcardHeartFill,
        },
        {
          title: "Create Category",
          path: `${role}/create-category`,
          icon: TbCategoryPlus,
        },
        {
          title: "Manage Categories",
          path: `${role}/manage-categories`,
          icon: SiGooglecampaignmanager360,
        }
      );
      break;
    case USER_ROLE.EDITOR:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: MdDashboard,
        },
        {
          title: "Manage Post",
          path: `${role}/manage-posts`,
          icon: BsFillPostcardHeartFill,
        },
        {
          title: "Manage Categories",
          path: `${role}/manage-categories`,
          icon: SiGooglecampaignmanager360,
        },
        {
          title: "Manage tags",
          path: `${role}/manage-tags`,
          icon: SiGooglecampaignmanager360,
        }
      );
      break;
    case USER_ROLE.USER:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: MdDashboard,
        },
        {
          title: "Review",
          path: `${role}/review`,
          icon: MdRateReview,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus, ...defaultMenus];
};
