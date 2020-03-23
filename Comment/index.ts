import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import { GitHub } from "./github";
import { IComment } from "./models/comment";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Comment function processed a request.");

  const comment: IComment = req.body;
  const redirectUrl: string = req.body.redirect;

  if (comment) {
    await new GitHub().saveComment(comment);

    context.res = {
      status: 302,
      headers: {
        location: redirectUrl
      }
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass comment details."
    };
  }
};

export default httpTrigger;
