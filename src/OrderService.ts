import {fetch} from "./infrastructure/fetch";
import {Order} from "./Order";

const headers = { Authorization: "Bearer: m086grj87987Ulirjhfrç!798AijhfzKO7IY9==" };

/**
 * The order service manages orders
 * It can create or update an order for a given user
 */
export class OrderService {

  /**
   * Create an order for the given user
   * Be careful the user must be either admin or maintainer
   * @param order
   *            The order to create
   * @param user
   *            The user who creates the order
   */
  async makeOrder(order: Order, user: any) {
    if (user) {
      const u = await this.getUserRole(user);
      if (u.role !== undefined) {
        if (u.role == "Admin" || u.role == "Maintainer") {
          await fetch("/api/rest/make-order", {
            method: "POST",
            payload: order,
            headers,
          });
        } else {
          throw new Error("Not Authorized");
        }
      } else {
        throw new Error("Not Authenticated");
      }
    } else {
      throw new Error("No user");
    }
  }

  /**
   * Create an order for the given user
   * Be careful the user must be either admin or maintainer
   * @param order
   *            The order to update
   * @param user
   *            The user who updates the order
   */
  async updateOrder(order: Order, user: any) {
    if (user) {
      const u = await this.getUserRole(user);
      if (u.role !== undefined) {
        if (u.role.toLowerCase() == "admin") {
          await fetch("/api/rest/update-order", {
            method: "POST",
            payload: order,
            headers,
          });
        } else {
          throw new Error("Not Authorized");
        }
      } else {
        throw new Error("Not Authenticated");
      }
    } else {
      throw new Error("No user");
    }
  }

  /**
   * Get the user role
   * @param user User we want to get the role
   * @returns The user role
   */
  getUserRole(user: any) {
    return fetch("/get-user-role?userId=" + user.id, { headers })
      .then((r) => r.json())
      .then((u) => ({
        id: u.code,
        role: u.r,
      }));
  }
}

