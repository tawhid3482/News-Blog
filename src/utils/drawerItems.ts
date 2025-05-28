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
import { GoCodeReview } from "react-icons/go";

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
          title: "Create Super User",
          path: `${role}/create-super-user`,
          icon: GrUserAdmin,
        },
        {
          title: "Manage Super User",
          path: `${role}/manage-super-user`,
          icon: RiAdminLine,
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
          title: "Manage Opinion",
          path: `${role}/manage-opinion`,
          icon: BsFillPostcardHeartFill,
        },
        {
          title: "Category",
          path: `${role}/category`,
          icon: TbCategoryPlus,
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
          title: "Create Super User",
          path: `${role}/create-super-user`,
          icon: GrUserAdmin,
        },
        {
          title: "Manage Super User",
          path: `${role}/manage-super-user`,
          icon: RiAdminLine,
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
          title: "Manage Opinion",
          path: `${role}/manage-opinion`,
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
          title: "Create Opinion",
          path: `${role}/create-opinion`,
          icon: MdPostAdd,
        },
        {
          title: "My Opinion",
          path: `${role}/my-opinion`,
          icon: BsFillPostcardHeartFill,
        },
        {
          title: "Create Category",
          path: `${role}/create-category`,
          icon: TbCategoryPlus,
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
          title: "Manage Opinions",
          path: `${role}/manage-opinions`,
          icon: BsFillPostcardHeartFill,
        },
        {
          title: "Manage Categories",
          path: `${role}/manage-categories`,
          icon: SiGooglecampaignmanager360,
        },
        {
          title: "Manage reviews",
          path: `${role}/manage-reviews`,
          icon: GoCodeReview,
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
