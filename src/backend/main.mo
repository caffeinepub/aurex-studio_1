import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";



actor {
  type QuoteRequest = {
    name : Text;
    email : Text;
    videoLength : Text;
    description : Text;
    status : Text;
    created_at : Time.Time;
  };

  module QuoteRequest {
    public func compare(quoteRequest1 : QuoteRequest, quoteRequest2 : QuoteRequest) : Order.Order {
      Int.compare(quoteRequest1.created_at, quoteRequest2.created_at);
    };
  };

  let quoteRequests = Map.empty<Time.Time, QuoteRequest>();
  var visitorCount : Nat = 0;

  public shared ({ caller }) func submitQuote(name : Text, email : Text, videoLength : Text, description : Text) : async () {
    let now = Time.now();
    let quoteRequest : QuoteRequest = {
      name;
      email;
      videoLength;
      description;
      created_at = now;
      status = "pending";
    };

    quoteRequests.add(now, quoteRequest);
  };

  public query ({ caller }) func getAllQuotes() : async [QuoteRequest] {
    quoteRequests.values().toArray().reverse();
  };

  public shared ({ caller }) func updateQuoteStatus(quoteId : Time.Time, newStatus : Text) : async () {
    switch (quoteRequests.get(quoteId)) {
      case (null) { Runtime.trap("Quote request not found") };
      case (?quoteRequest) {
        let updatedQuote : QuoteRequest = { quoteRequest with status = newStatus };
        quoteRequests.add(quoteId, updatedQuote);
      };
    };
  };

  public shared ({ caller }) func deleteQuote(quoteId : Time.Time) : async () {
    if (not quoteRequests.containsKey(quoteId)) {
      Runtime.trap("Quote request not found");
    };
    quoteRequests.remove(quoteId);
  };

  public query ({ caller }) func checkAdminCredentials(username : Text, password : Text) : async Bool {
    Text.equal(username, "aurexadmin") and Text.equal(password, "AurexAdmin@123");
  };

  public shared ({ caller }) func incrementVisitor() : async Nat {
    visitorCount += 1;
    visitorCount;
  };

  public query ({ caller }) func getVisitorCount() : async Nat {
    visitorCount;
  };
};
